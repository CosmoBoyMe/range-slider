import "@testing-library/jest-dom";

import { Tooltip } from "../../../View/subView";
import { SliderClasses } from "../../../constants";

describe("Track class:", () => {
  let rootElement;
  let tooltipInstance;
  let tooltipElement;

  beforeEach(() => {
    rootElement = document.createElement("div");
    tooltipInstance = new Tooltip({ rootElement, value: 5, isVertical: true });
    tooltipElement = tooltipInstance.getElement();
  });

  test("root element should contain tooltip element", () => {
    expect(rootElement).toContainElement(tooltipElement);
  });

  test("should destroy element", () => {
    tooltipInstance.destroy();
    expect(rootElement).not.toContainElement(tooltipElement);
  });

  test("tooltip element should have text", () => {
    expect(tooltipElement).toHaveTextContent(5);
  });

  test("text should be updated", () => {
    tooltipInstance.updateValue(10);
    expect(tooltipElement).toHaveTextContent(10);
  });

  test(`muss have class ${SliderClasses.TOOLTIP_VERTICAL}`, () => {
    expect(tooltipElement).toHaveClass(SliderClasses.TOOLTIP_VERTICAL);
  });

  test(`must not have a class ${SliderClasses.TOOLTIP_VERTICAL}`, () => {
    tooltipInstance = new Tooltip({ rootElement, value: 5, isVertical: false });
    tooltipElement = tooltipInstance.getElement();
    expect(tooltipElement).not.toHaveClass(SliderClasses.TOOLTIP_VERTICAL);
  });
});
