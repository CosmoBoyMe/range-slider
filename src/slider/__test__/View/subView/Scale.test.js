import "@testing-library/jest-dom";

import { Scale } from "../../../View/subView";
import { SliderClasses } from "../../../constants";

describe("Scale class:", () => {
  let rootElement;
  let scaleInstance;
  let scaleElement;
  beforeEach(() => {
    rootElement = document.createElement("div");
    scaleInstance = new Scale({
      rootElement,
      min: 1,
      max: 10,
      step: 1,
      scaleCounts: 4,
      isVertical: false,
      handleScaleClick: () => undefined,
    });
    scaleElement = scaleInstance.getElement();
  });

  test("root element must contain scale element", () => {
    expect(rootElement).toContainElement(scaleElement);
  });

  test("scale element must be remove from root element", () => {
    scaleInstance.destroy();
    expect(rootElement).not.toContainElement(scaleElement);
  });

  test("scale element must have vertical class", () => {
    const scaleVerticalInstance = new Scale({
      rootElement,
      min: 1,
      max: 10,
      step: 1,
      scaleCounts: 10,
      isVertical: true,
      handleScalePointClick: () => undefined,
    });
    const scaleVerticalElement = scaleVerticalInstance.getElement();
    expect(scaleVerticalElement).toHaveClass(SliderClasses.SCALE_VERTICAL);
  });

  test("scale element must not have vertical class", () => {
    expect(scaleElement).not.toHaveClass(SliderClasses.SCALE_VERTICAL);
  });

  test("deleteScalePointsWhenPointOverlap: should not delete point if not overlap", () => {
    const customPointElement = document.createElement("div");
    customPointElement.classList.add(SliderClasses.SCALE_POINT);
    customPointElement.getBoundingClientRect = () => ({
      top: 100,
      bottom: 100,
      left: 100,
      right: 100,
    });
    scaleElement.append(customPointElement);
    scaleInstance.deleteScalePointsWhenPointOverlap();
    expect(scaleElement).toContainElement(customPointElement);
  });

  test("deleteScalePointsWhenPointOverlap: should delete overlap point", () => {
    const customPointElement = document.createElement("div");
    customPointElement.classList.add(SliderClasses.SCALE_POINT);
    customPointElement.getBoundingClientRect = () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });
    scaleElement.append(customPointElement);
    expect(scaleElement.children.length).toBe(2);
    scaleInstance.deleteScalePointsWhenPointOverlap();
    expect(scaleElement.children.length).toBe(1);
  });
});
