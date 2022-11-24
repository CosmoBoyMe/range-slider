import "@testing-library/jest-dom";

import { Scale } from "../../../View/subView";
import { CSS_CLASSES } from "../../../const";

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
      vertical: false,
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
      vertical: true,
      handleScalePointClick: () => undefined,
    });
    const scaleVerticalElement = scaleVertical.getElement();
    expect(scaleVerticalElement).toHaveClass(CSS_CLASSES.SCALE_VERTICAL);
  });

  test("scale element must not have vertical class", () => {
    expect(scaleEl).not.toHaveClass(CSS_CLASSES.SCALE_VERTICAL);
  });

  test("deleteScalePointsWhenPointOverlap: should not delete point if not overlap", () => {
    const customPoint = document.createElement("div");
    customPoint.classList.add(CSS_CLASSES.SCALE_POINT);
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
    customPoint.classList.add(CSS_CLASSES.SCALE_POINT);
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
