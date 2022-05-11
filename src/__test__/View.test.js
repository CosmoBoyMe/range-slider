import '@testing-library/jest-dom';

import { View } from '../View/View';

import { ObserverTypes } from '../const';

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
    scale: true,
    tooltip: true,
    progress: false,
    values: [-5, 0, 10, 15],
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

  test('click on track', () => {
    const trackInstance = view.getAllInstance().track;
    const trackElement = trackInstance.getElement();
    const cb = jest.fn();
    view.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    trackElement.dispatchEvent(new Event('click'));
    expect(cb).toBeCalled();
  });

  test('check click on scale', () => {
    const scaleInstance = view.getAllInstance().scale;
    const scaleElement = scaleInstance.getElement();
    const cb = jest.fn();
    view.subscribe(ObserverTypes.UPDATE_VALUE, cb);
    scaleElement.dispatchEvent(new Event('click'));
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
      new MouseEvent('pointermove', { clientX: 50, clientY: 50 }),
    );
    expect(cb).toBeCalled();
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
      new MouseEvent('pointermove', { clientX: 100, clientY: 100 }),
    );
    expect(cb).toBeCalled();
  });

  test('getCurrentValueFromCoords method', () => {
    const e = view.getSliderElement();
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 100 });
    e.getBoundingClientRect = () => ({
      top: 100,
      bottom: 200,
    });
    const x = view.getCurrentValueFromCoords(0, 150);
    expect(x).toBe(5);
    const x1 = view.getCurrentValueFromCoords(0, 0);
    expect(x1).toBe(10);
    const x2 = view.getCurrentValueFromCoords(0, 9999999);
    expect(x2).toBe(0);
  });
});
