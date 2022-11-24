import "@testing-library/jest-dom";

import { CSS_CLASSES } from "../../../const";
import { Tooltip } from "../../../View/subView";

describe("Track class:", () => {
  let rootElement;
  let tooltip;
  let tooltipElement;

  beforeEach(() => {
    rootElement = document.createElement("div");
    tooltip = new Tooltip({ rootElement, value: 5, isVertical: true });
    tooltipElement = tooltip.getElement();
  });

  test("root element should contain tooltip element", () => {
    expect(rootElement).toContainElement(tooltipElement);
  });

  test("should destroy element", () => {
    tooltip.destroy();
    expect(rootElement).not.toContainElement(tooltipElement);
  });

  test("tooltip element should have text", () => {
    expect(tooltipElement).toHaveTextContent(5);
  });

  test("text should be updated", () => {
    tooltip.updateValue(10);
    expect(tooltipElement).toHaveTextContent(10);
  });

  test(`muss have class ${CSS_CLASSES.TOOLTIP_VERTICAL}`, () => {
    expect(tooltipElement).toHaveClass(CSS_CLASSES.TOOLTIP_VERTICAL);
  });

  test(`must not have a class ${CSS_CLASSES.TOOLTIP_VERTICAL}`, () => {
    tooltip = new Tooltip({ rootElement, value: 5, isVertical: false });
    tooltipElement = tooltip.getElement();
    expect(tooltipElement).not.toHaveClass(CSS_CLASSES.TOOLTIP_VERTICAL);
  });
});
