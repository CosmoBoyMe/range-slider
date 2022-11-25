import "@testing-library/jest-dom";

import { SliderClasses } from "../../../const";
import { Scale } from "../../../View/subView";

describe("Scale class:", () => {
  let rootElement;
  let scale;
  let scaleEl;
  beforeEach(() => {
    rootElement = document.createElement("div");
    scale = new Scale({
      rootDom: rootElement,
      min: 1,
      max: 10,
      step: 1,
      scaleCounts: 4,
      isVertical: false,
      handleScaleClick: () => undefined,
    });
    scaleEl = scale.getElement();
  });
  test("root element must contain scale element", () => {
    expect(rootElement).toContainElement(scaleEl);
  });

  test("scale element must be remove from root element", () => {
    scale.destroy();
    expect(rootElement).not.toContainElement(scaleEl);
  });

  test("scale element must have vertical class", () => {
    const scaleVertical = new Scale({
      rootDom: rootElement,
      min: 1,
      max: 10,
      step: 1,
      scaleCounts: 10,
      isVertical: true,
      handleScalePointClick: () => undefined,
    });
    const scaleVerticalElement = scaleVertical.getElement();
    expect(scaleVerticalElement).toHaveClass(SliderClasses.SCALE_VERTICAL);
  });

  test("scale element must not have vertical class", () => {
    expect(scaleElement).not.toHaveClass(SliderClasses.SCALE_VERTICAL);
  });

  test("deleteScalePointsWhenPointOverlap: should not delete point if not overlap", () => {
    const customPoint = document.createElement("div");
    customPointElement.classList.add(SliderClasses.SCALE_POINT);
    customPoint.getBoundingClientRect = () => ({
      top: 100,
      bottom: 100,
      left: 100,
      right: 100,
    });
    scaleEl.append(customPoint);
    scale.deleteScalePointsWhenPointOverlap();
    expect(scaleEl).toContainElement(customPoint);
  });

  test("deleteScalePointsWhenPointOverlap: should delete overlap point", () => {
    const customPoint = document.createElement("div");
    customPointElement.classList.add(SliderClasses.SCALE_POINT);
    customPoint.getBoundingClientRect = () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });
    scaleEl.append(customPoint);
    expect(scaleEl.children.length).toBe(2);
    scale.deleteScalePointsWhenPointOverlap();
    expect(scaleEl.children.length).toBe(1);
  });
});
