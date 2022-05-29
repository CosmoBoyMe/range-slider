import '@testing-library/jest-dom';

import { View } from '../../View/View';
import { Model } from '../../Model/Model';
import { Presenter } from '../../Presenter/Presenter';

import { ObserverTypes, CSS_CLASSES } from '../../const';

describe('View class:', () => {
  const defaultOptions = {
    min: 0,
    max: 10,
    step: 1,
    scaleCounts: 11,
    vertical: true,
    scale: true,
    tooltip: true,
    progress: true,
    values: [5, 6],
  };

  const customOptions = {
    min: -10,
    max: 20,
    step: 5,
    scaleCounts: 11,
    vertical: false,
    scale: false,
    tooltip: true,
    progress: false,
    values: [-5, 0, 10, 15],
  };

  const optionWithOneValue = {
    min: 0,
    max: 10,
    step: 1,
    scaleCounts: 11,
    vertical: false,
    scale: true,
    tooltip: false,
    progress: false,
    values: [1],
  };

  let view;
  let element;
  beforeEach(() => {
    element = document.createElement('div');
    view = new View(element, defaultOptions);
  });

  test('must update value', () => {
    const { values } = view.getOptions();
    const oldValues = [...values];
    expect(oldValues).toEqual([5, 6]);

    view.updateValue({ value: 9, index: 0 });
    expect(values).toEqual([9, 6]);
    expect(oldValues).not.toEqual(values);
  });

  test('must update options', () => {
    const oldOptions = view.getOptions();
    view.updateOptions(customOptions);
    const newOptions = view.getOptions();
    expect(newOptions).not.toEqual(oldOptions);
    expect(newOptions).toEqual(customOptions);
  });

  test('element should contain slider element', () => {
    const sliderElement = view.getSliderElement();
    expect(element).toContainElement(sliderElement);
    expect(element).not.toBeEmptyDOMElement;
  });

  test('pointerdown on track should update value', () => {
    const trackInstance = view.getAllInstance().track;
    const trackElement = trackInstance.getElement();
    const cb = jest.fn();
    view.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    trackElement.dispatchEvent(new Event('pointerdown'));
    expect(cb).toBeCalled();
  });

  test('check click on scale with range values', () => {
    const scaleInstance = view.getAllInstance().scale;
    const scaleElement = scaleInstance.getElement();
    const scalePointElement = scaleElement.querySelector(
      `.${CSS_CLASSES.SCALE_POINT}`
    );
    const cb = jest.fn();
    view.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    scaleElement.dispatchEvent(new MouseEvent('click'));
    expect(cb).not.toBeCalled();
    scalePointElement.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
      })
    );
    expect(cb).toBeCalled();
  });

  test('check click on scale with one value', () => {
    const viewInstance = new View(element, optionWithOneValue);
    const scaleInstance = viewInstance.getAllInstance().scale;
    const scaleElement = scaleInstance.getElement();
    const scalePointElement = scaleElement.querySelector(
      `.${CSS_CLASSES.SCALE_POINT}`
    );
    const cb = jest.fn();
    viewInstance.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    scaleElement.dispatchEvent(new MouseEvent('click'));
    expect(cb).not.toBeCalled();
    scalePointElement.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
      })
    );
    expect(cb).toBeCalled();
  });

  test('check click on thumb', () => {
    const thumbsInstances = view.getAllInstance().thumbs;
    const thumbElement = thumbsInstances[0].getElement();
    const cb = jest.fn();
    view.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    expect(cb).not.toBeCalled();
    thumbElement.dispatchEvent(new Event('pointerdown'));
    expect(cb).not.toBeCalled();
    document.dispatchEvent(
      new MouseEvent('pointermove', { clientX: 50, clientY: 50 })
    );
    expect(cb).toBeCalled();
  });

  test('thumb value should be limited by prev thumb value', () => {
    const model = new Model();
    const modelOptions = model.getOptions();
    const viewInstance = new View(element, modelOptions);
    const presenter = new Presenter(model, viewInstance);
    const thumbsInstances = viewInstance.getAllInstance().thumbs;
    const secondThumbElement = thumbsInstances[1].getElement();
    const sliderElement = viewInstance.getSliderElement();
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 100,
    });
    sliderElement.getBoundingClientRect = () => ({
      left: 100,
      right: 200,
      top: 100,
      bottom: 200,
    });
    secondThumbElement.dispatchEvent(new Event('pointerdown'));
    document.dispatchEvent(
      new MouseEvent('pointermove', { clientX: 1000, clientY: 1000 })
    );
    const viewOptions = viewInstance.getOptions();
    expect(viewOptions.values[1]).toBe(5);
  });

  test('thumb value should be limited by next thumb value', () => {
    const model = new Model();
    const modelOptions = model.getOptions();
    const viewInstance = new View(element, modelOptions);
    const presenter = new Presenter(model, viewInstance);
    const thumbsInstances = viewInstance.getAllInstance().thumbs;
    const firstThumbElement = thumbsInstances[0].getElement();
    const sliderElement = viewInstance.getSliderElement();
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 100,
    });
    sliderElement.getBoundingClientRect = () => ({
      left: 100,
      right: 200,
      top: 100,
      bottom: 200,
    });
    firstThumbElement.dispatchEvent(new Event('pointerdown'));
    document.dispatchEvent(
      new MouseEvent('pointermove', { clientX: 0, clientY: 0 })
    );
    const viewOptions = viewInstance.getOptions();
    expect(viewOptions.values[0]).toBe(6);
  });

  test('ondragstart event on thumb should be false', () => {
    const thumbsInstances = view.getAllInstance().thumbs;
    const thumbElement = thumbsInstances[0].getElement();
    thumbElement.dispatchEvent(new Event('pointerdown'));
    expect(thumbElement.ondragstart()).toBe(false);
  });

  test('thumb value should not update if value is same', () => {
    const model = new Model();
    const viewInstance = new View(element, optionWithOneValue);
    const presenter = new Presenter(model, viewInstance);
    const sliderElement = viewInstance.getSliderElement();
    const thumbsInstances = viewInstance.getAllInstance().thumbs;
    const thumbElement = thumbsInstances[0].getElement();
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 10,
    });
    sliderElement.getBoundingClientRect = () => ({
      left: 0,
      right: 10,
      top: 0,
      bottom: 10,
    });
    const cb = jest.fn();
    viewInstance.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    expect(cb).not.toBeCalled();
    thumbElement.dispatchEvent(new Event('pointerdown'));
    document.dispatchEvent(
      new MouseEvent('pointermove', { clientX: 1, clientY: 1 })
    );
    const viewOptions = viewInstance.getOptions();
    expect(viewOptions.values[0]).toBe(1);
    expect(cb).not.toBeCalled();
    document.dispatchEvent(
      new MouseEvent('pointermove', { clientX: 10, clientY: 10 })
    );
    expect(cb).toBeCalled();
    expect(viewInstance.getOptions().values[0]).toBe(10);
  });

  test('toggleActiveThumb: first thumb with max value should have active class', () => {
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

  test('toggleActiveThumb: clicked thumb should have active class', () => {
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

  test('document pointer move and pointer up should remove after thumb pointer up', () => {
    const thumbsInstances = view.getAllInstance().thumbs;
    const thumbElement = thumbsInstances[0].getElement();
    thumbElement.dispatchEvent(new Event('pointerdown'));
    const cb = jest.fn();
    document.removeEventListener = cb;
    document.dispatchEvent(new Event('pointerup'));
    expect(cb).toHaveBeenCalled();
  });

  test('thumb value should be limited by next thumb value', () => {
    const sliderElement = view.getSliderElement();
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 100,
    });
    sliderElement.getBoundingClientRect = () => ({
      left: 100,
      right: 200,
      top: 100,
      bottom: 200,
    });
    const thumbsInstances = view.getAllInstance().thumbs;
    const thumbElement = thumbsInstances[1].getElement();
    thumbElement.dispatchEvent(new Event('pointerdown'));
    document.dispatchEvent(
      new MouseEvent('pointermove', { clientX: 1000, clientY: 1000 })
    );
  });

  test('check click on thumb vertical', () => {
    const customView = new View(element, customOptions);
    const thumbsInstances = customView.getAllInstance().thumbs;
    const thumbElement = thumbsInstances[0].getElement();
    const cb = jest.fn();
    customView.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    expect(cb).not.toBeCalled();
    thumbElement.dispatchEvent(new Event('pointerdown'));
    expect(cb).not.toBeCalled();
    document.dispatchEvent(
      new MouseEvent('pointermove', { clientX: 100, clientY: 100 })
    );
    expect(cb).toBeCalled();
  });

  test('getCurrentValueFromCoords method', () => {
    const sliderElement = view.getSliderElement();
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
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
});
