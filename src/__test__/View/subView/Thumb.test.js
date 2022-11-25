/* eslint-disable @typescript-eslint/no-unused-vars */
import "@testing-library/jest-dom";

import { SliderClasses } from "../../../const";
import { Thumb } from "../../../View/subView";

describe("Thumb class:", () => {
  let rootElement;
  let thumbInstance;
  let thumbEl;

  beforeEach(() => {
    rootElement = document.createElement("div");
    thumbInstance = new Thumb({
      rootElement,
      value: 5,
      min: 0,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: true,
      withTooltip: true,
    });
    thumbEl = thumbInstance.getElement();
  });

  test("root element should contain thumb element", () => {
    expect(rootElement).toContainElement(thumbEl);
  });

  test("root element to be empty element", () => {
    thumbInstance.destroy();
    expect(rootElement).toBeEmptyDOMElement();
  });

  test("value must updated", () => {
    const thumb = new Thumb({
      rootElement,
      value: 5,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: true,
      withTooltip: false,
    });
    const value = thumb.getValue();
    expect(value).toBe(5);
    thumb.updateValue(7);
    const currentValue = thumb.getValue();
    expect(currentValue).toBe(7);
  });

  test("thumb must update tooltip content text", () => {
    const tooltipElement = rootElement.querySelector(
      `.${SliderClasses.TOOLTIP}`
    );
    expect(tooltipElement).toHaveTextContent(5);
    thumbInstance.updateValue(10);
    expect(tooltipElement).toHaveTextContent(10);
  });

  test("thumb must contain tooltip", () => {
    const tooltipElement = thumbElement.querySelector(
      `.${SliderClasses.TOOLTIP}`
    );
  });

  test("thumb must not contain tooltip", () => {
    const thumb = new Thumb({
      rootElement,
      value: 5,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: true,
      withTooltip: false,
    });
    const tooltipElement = thumbEl.querySelector(`.${SliderClasses.TOOLTIP}`);
  });

  test("thumb element must have vertical class", () => {
    expect(thumbElement).toHaveClass(SliderClasses.THUMB_VERTICAL);
  });

  test("thumb element must not have vertical class", () => {
    const thumb = new Thumb({
      rootElement,
      value: 5,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: false,
      withTooltip: false,
    });
    const thumbElement = thumb.getElement();
    expect(thumbEl).not.toHaveClass(SliderClasses.THUMB_VERTICAL);
  });

  test("setActiveClass: should add active class", () => {
    thumbInstance.addActiveClass();
    expect(thumbElement).toHaveClass(SliderClasses.THUMB_ACTIVE);
  });

  test("removeActiveClass: should remove active class", () => {
    thumbInstance.addActiveClass();
    expect(thumbElement).toHaveClass(SliderClasses.THUMB_ACTIVE);
    thumbInstance.removeActiveClass();
    expect(thumbElement).not.toHaveClass(SliderClasses.THUMB_ACTIVE);
  });

  test("updatePosition: should update thumb position", () => {
    thumbInstance.value = 9;
    thumbInstance.updatePosition();
    expect(thumbEl).toHaveStyle({ bottom: "90%" });
    thumbInstance.value = 3;
    thumbInstance.updatePosition();
    expect(thumbEl).toHaveStyle("bottom: 30%");
  });

  test("updatePosition: should update thumb position by vertical", () => {
    expect(thumbEl).toHaveStyle("bottom: 50%");
    thumbInstance.value = 10;
    thumbInstance.updatePosition();
    expect(thumbEl).toHaveStyle("bottom: 100%");
    thumbInstance.value = 3;
    thumbInstance.updatePosition();
    expect(thumbEl).toHaveStyle("bottom: 30%");
  });

  test("updatePosition: should update thumb position by horizontal", () => {
    const thumb = new Thumb({
      rootElement,
      value: 5,
      min: 0,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: false,
      withTooltip: false,
    });
    const thumbElement = thumb.getElement();
    expect(thumbElement).toHaveStyle("left: 50%");
    thumb.value = 10;
    thumb.updatePosition();
    expect(thumbElement).toHaveStyle("left: 100%");
    thumb.value = 3;
    thumb.updatePosition();
    expect(thumbElement).toHaveStyle("left: 30%");
  });

  test("checkTooltipOutsideBorder: tooltip should not going outside by initialization", () => {
    const thumb = new Thumb({
      rootElement,
      value: 1000000,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: false,
      withTooltip: true,
    });
    const tooltipEl = thumb.getTooltipInstance().getElement();
    tooltipEl.getBoundingClientRect = () => ({
      right: 10,
    });
    thumb.checkTooltipOutsideBorder();
    expect(tooltipEl).toHaveStyle("transform: translate(-10px, 0)");
  });

  test("checkTooltipOutsideBorder: tooltip should not going outside after initialization", () => {
    const thumb = new Thumb({
      rootElement,
      value: 1000000,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: false,
      withTooltip: true,
    });
    const tooltipEl = thumb.getTooltipInstance().getElement();
    tooltipEl.getBoundingClientRect = () => ({
      right: 10,
    });
    thumb.checkTooltipOutsideBorder();
    expect(tooltipEl).toHaveStyle("transform: translate(-10px, 0)");

    tooltipEl.getBoundingClientRect = () => ({
      right: 1000,
    });
    thumb.checkTooltipOutsideBorder();
    expect(tooltipEl).toHaveStyle("transform: translate(-1010px, 0)");
  });

  test("checkTooltipOutsideBorder: tooltip should not have transform style", () => {
    const thumb = new Thumb({
      rootElement,
      value: 1000000,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: () => undefined,
      isVertical: false,
      withTooltip: true,
    });
    const tooltipEl = thumb.getTooltipInstance().getElement();
    tooltipEl.getBoundingClientRect = () => ({
      right: 10,
    });
    thumb.checkTooltipOutsideBorder();
    expect(tooltipEl).toHaveStyle("transform: translate(-10px, 0)");

    tooltipEl.getBoundingClientRect = () => ({
      right: -11,
    });
    thumb.checkTooltipOutsideBorder();
    expect(tooltipEl).not.toHaveStyle("transform: translate(-10px, 0)");
  });
});
