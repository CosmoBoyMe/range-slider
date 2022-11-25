/* eslint-disable @typescript-eslint/no-unused-vars */
import "@testing-library/jest-dom";

import { ObserverTypes, CSS_CLASSES } from "../../const";
import { View } from "../../View/View";
import { Model } from "../../Model/Model";
import { Presenter } from "../../Presenter/Presenter";

describe("View class:", () => {
  const defaultOptions = {
    min: 0,
    max: 10,
    step: 1,
    scaleCounts: 11,
    isVertical: true,
    withScale: true,
    withTooltip: true,
    withProgress: true,
    values: [5, 6],
  };

  const customOptions = {
    min: -10,
    max: 20,
    step: 5,
    scaleCounts: 11,
    isVertical: false,
    withScale: false,
    withTooltip: true,
    withProgress: false,
    values: [-5, 0, 10, 15],
  };

  const optionWithOneValue = {
    min: 0,
    max: 10,
    step: 1,
    scaleCounts: 11,
    isVertical: false,
    withScale: true,
    withTooltip: false,
    withProgress: false,
    values: [1],
  };

  let view;
  let element;
  beforeEach(() => {
    element = document.createElement("div");
    view = new View(element, defaultOptions);
  });

  test("must update value", () => {
    const { values } = view.getOptions();
    const oldValues = [...values];
    expect(oldValues).toEqual([5, 6]);

    view.updateValue({ value: 9, index: 0 });
    expect(values).toEqual([9, 6]);
    expect(oldValues).not.toEqual(values);
  });

  test("must update options", () => {
    const oldOptions = view.getOptions();
    view.updateOptions(customOptions);
    const newOptions = view.getOptions();
    expect(newOptions).not.toEqual(oldOptions);
    expect(newOptions).toEqual(customOptions);
  });

  test("element should contain slider element", () => {
    const sliderElement = view.getSliderElement();
    expect(element).toContainElement(sliderElement);
    expect(element).not.toBeEmptyDOMElement;
  });

  test("pointerdown on track should update value", () => {
    const trackInstance = view.getAllInstance().track;
    const trackElement = trackInstance.getElement();
    const cb = jest.fn();
    view.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    trackElement.dispatchEvent(new Event("pointerdown"));
    expect(cb).toBeCalled();
  });

  test("check click on scale with range values", () => {
    const scaleInstance = view.getAllInstance().scale;
    const scaleElement = scaleInstance.getElement();
    const scalePointElement = scaleElement.querySelector(
      `.${CSS_CLASSES.SCALE_POINT}`
    );
    const cb = jest.fn();
    view.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    scaleElement.dispatchEvent(new MouseEvent("click"));
    expect(cb).not.toBeCalled();
    scalePointElement.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
      })
    );
    expect(cb).toBeCalled();
  });

  test("check click on scale with one value", () => {
    const viewInstance = new View(element, optionWithOneValue);
    const scaleInstance = viewInstance.getAllInstance().scale;
    const scaleElement = scaleInstance.getElement();
    const scalePointElement = scaleElement.querySelector(
      `.${CSS_CLASSES.SCALE_POINT}`
    );
    const cb = jest.fn();
    viewInstance.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    scaleElement.dispatchEvent(new MouseEvent("click"));
    expect(cb).not.toBeCalled();
    scalePointElement.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
      })
    );
    expect(cb).toBeCalled();
  });

  test("check click on thumb", () => {
    const thumbsInstances = view.getAllInstance().thumbs;
    const thumbElement = thumbsInstances[0].getElement();
    const cb = jest.fn();
    view.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    expect(cb).not.toBeCalled();
    thumbElement.dispatchEvent(new Event("pointerdown"));
    expect(cb).not.toBeCalled();
    document.dispatchEvent(
      new MouseEvent("pointerup", { clientX: 50, clientY: 50 })
    );
    expect(cb).toBeCalled();
  });

  test("thumb value should be limited by prev thumb value", () => {
    const model = new Model();
    const modelOptions = model.getOptions();
    const viewInstance = new View(element, modelOptions);
    const presenter = new Presenter(model, viewInstance);
    const thumbsInstances = viewInstance.getAllInstance().thumbs;
    const secondThumbElement = thumbsInstances[1].getElement();
    const sliderElement = viewInstance.getSliderElement();
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 10,
    });
    sliderElement.getBoundingClientRect = () => ({
      top: 0,
      bottom: 10,
    });
    secondThumbElement.dispatchEvent(new Event("pointerdown"));
    document.dispatchEvent(new MouseEvent("pointerup", { clientY: 10 }));
    const viewOptions = viewInstance.getOptions();
    expect(viewOptions.values[1]).toBe(5);
  });

  test("thumb value should be limited by next thumb value", () => {
    const model = new Model();
    const modelOptions = model.getOptions();
    const viewInstance = new View(element, modelOptions);
    const presenter = new Presenter(model, viewInstance);
    const thumbsInstances = viewInstance.getAllInstance().thumbs;
    const firstThumbElement = thumbsInstances[0].getElement();
    const sliderElement = viewInstance.getSliderElement();
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 10,
    });
    sliderElement.getBoundingClientRect = () => ({
      top: 0,
      bottom: 10,
    });
    firstThumbElement.dispatchEvent(new Event("pointerdown"));
    document.dispatchEvent(new MouseEvent("pointerup", { clientY: 0 }));
    const viewOptions = viewInstance.getOptions();
    expect(viewOptions.values[0]).toBe(6);
  });

  test("thumb value should not limited if value is only one", () => {
    const model = new Model(optionWithOneValue);
    const modelOptions = model.getOptions();
    const viewInstance = new View(element, modelOptions);
    const presenter = new Presenter(model, viewInstance);
    const thumbsInstances = viewInstance.getAllInstance().thumbs;
    const thumbElement = thumbsInstances[0].getElement();
    const sliderElement = viewInstance.getSliderElement();
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 10,
    });
    sliderElement.getBoundingClientRect = () => ({
      left: 0,
      right: 10,
    });
    thumbElement.dispatchEvent(new Event("pointerdown"));
    document.dispatchEvent(new MouseEvent("pointerup", { clientX: 10 }));
    const viewOptions = viewInstance.getOptions();
    expect(viewOptions.values[0]).toBe(10);
    thumbElement.dispatchEvent(new Event("pointerdown"));
    document.dispatchEvent(new MouseEvent("pointerup", { clientX: 0 }));
    const newViewOptions = viewInstance.getOptions();
    expect(newViewOptions.values[0]).toBe(0);
  });

  test("thumb position should update by pointermove", () => {
    const model = new Model(optionWithOneValue);
    const presenter = new Presenter(model, view);
    const thumbsInstances = view.getAllInstance().thumbs;
    const sliderElement = view.getSliderElement();
    const firstThumbElement = thumbsInstances[0].getElement();
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 10,
    });
    sliderElement.getBoundingClientRect = () => ({
      top: 0,
      bottom: 10,
    });
    expect(firstThumbElement).toHaveStyle("bottom: 50%");
    firstThumbElement.dispatchEvent(new Event("pointerdown"));
    document.dispatchEvent(new MouseEvent("pointermove", { clientY: 10 }));
    expect(firstThumbElement).toHaveStyle("bottom: 0%");
    document.dispatchEvent(new MouseEvent("pointermove", { clientY: 7 }));
    expect(firstThumbElement).toHaveStyle("bottom: 30%");
  });

  test("view should not notify if thumb value not updated ", () => {
    const thumbsInstances = view.getAllInstance().thumbs;
    const sliderElement = view.getSliderElement();
    const firstThumbElement = thumbsInstances[0].getElement();
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 10,
    });
    sliderElement.getBoundingClientRect = () => ({
      top: 0,
      bottom: 10,
    });
    firstThumbElement.dispatchEvent(new Event("pointerdown"));
    document.dispatchEvent(new MouseEvent("pointermove", { clientY: 5 }));
    const cb = jest.fn();
    view.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    expect(cb).not.toBeCalled();
  });

  test("ondragstart event on thumb should be false", () => {
    const thumbsInstances = view.getAllInstance().thumbs;
    const thumbElement = thumbsInstances[0].getElement();
    thumbElement.dispatchEvent(new Event("pointerdown"));
    expect(thumbElement.ondragstart()).toBe(false);
  });

  test("toggleActiveThumb: first thumb with max value should have active class", () => {
    const model = new Model({ values: [10, 10] });
    const modelOptions = model.getOptions();
    const viewInstance = new View(element, modelOptions);
    const presenter = new Presenter(model, viewInstance);
    const thumbsInstances = viewInstance.getAllInstance().thumbs;
    const firstThumbElement = thumbsInstances[0].getElement();
    const secondThumbElement = thumbsInstances[1].getElement();
    expect(firstThumbElement).toHaveClass(CSS_CLASSES.THUMB_ACTIVE);
    expect(secondThumbElement).not.toHaveClass(CSS_CLASSES.THUMB_ACTIVE);
  });

  test("toggleActiveThumb: clicked thumb should have active class", () => {
    const model = new Model();
    const modelOptions = model.getOptions();
    const viewInstance = new View(element, modelOptions);
    const presenter = new Presenter(model, viewInstance);
    const thumbsInstances = viewInstance.getAllInstance().thumbs;
    const firstThumbElement = thumbsInstances[0].getElement();
    const secondThumbElement = thumbsInstances[1].getElement();
    model.updateValue({ value: 5, index: 1 });
    expect(firstThumbElement).not.toHaveClass(CSS_CLASSES.THUMB_ACTIVE);
    expect(secondThumbElement).toHaveClass(CSS_CLASSES.THUMB_ACTIVE);
    model.updateValue({ value: 7, index: 1 });
    expect(firstThumbElement).not.toHaveClass(CSS_CLASSES.THUMB_ACTIVE);
    expect(secondThumbElement).toHaveClass(CSS_CLASSES.THUMB_ACTIVE);
  });

  test("document pointer move and pointer up should remove after thumb pointer up", () => {
    const thumbsInstances = view.getAllInstance().thumbs;
    const thumbElement = thumbsInstances[0].getElement();
    thumbElement.dispatchEvent(new Event("pointerdown"));
    const cb = jest.fn();
    document.removeEventListener = cb;
    document.dispatchEvent(new Event("pointerup"));
    expect(cb).toHaveBeenCalled();
  });

  test("check click on thumb vertical", () => {
    const customView = new View(element, customOptions);
    const thumbsInstances = customView.getAllInstance().thumbs;
    const thumbElement = thumbsInstances[0].getElement();
    const cb = jest.fn();
    customView.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    expect(cb).not.toBeCalled();
    thumbElement.dispatchEvent(new Event("pointerdown"));
    expect(cb).not.toBeCalled();
    document.dispatchEvent(
      new MouseEvent("pointerup", { clientX: 100, clientY: 100 })
    );
    expect(cb).toBeCalled();
  });

  test("getCurrentValueFromCoords method", () => {
    const sliderElement = view.getSliderElement();
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 100,
    });
    sliderElement.getBoundingClientRect = () => ({
      top: 100,
      bottom: 200,
    });
    const firstExpectedValue = view.getCurrentValueFromCoords(0, 150);
    expect(firstExpectedValue).toBe(5);
    const secondExpectedValue = view.getCurrentValueFromCoords(0, 0);
    expect(secondExpectedValue).toBe(10);
    const thirdExpectedValue = view.getCurrentValueFromCoords(0, 9999999);
    expect(thirdExpectedValue).toBe(0);
  });

  test("handleThumbPointerDown: target should be null", () => {
    const event = new MouseEvent("pointerdown");
    view.handleThumbPointerDown(event, 1);
    expect(event.target).toBe(null);
  });
});
