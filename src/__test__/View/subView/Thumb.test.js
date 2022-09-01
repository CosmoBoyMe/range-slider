/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';

import { Thumb } from '../../../View/subView';
import { CSS_CLASSES } from '../../../const';

describe('Thumb class:', () => {
  let rootElement;
  let thumbInstance;
  let thumbEl;

  beforeEach(() => {
    rootElement = document.createElement('div');
    thumbInstance = new Thumb({
      rootElement,
      value: 5,
      min: 0,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: true,
      enableTooltip: true,
    });
    thumbEl = thumbInstance.getElement();
  });

  test('root element should contain thumb element', () => {
    expect(rootElement).toContainElement(thumbEl);
  });

  test('root element to be empty element', () => {
    thumbInstance.destroy();
    expect(rootElement).toBeEmptyDOMElement();
  });

  test('value must updated', () => {
    const thumb = new Thumb({
      rootElement,
      value: 5,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: true,
      enableTooltip: false,
    });
    const value = thumb.getValue();
    expect(value).toBe(5);
    thumb.updateValue(7);
    const currentValue = thumb.getValue();
    expect(currentValue).toBe(7);
  });

  test('thumb must update tooltip content text', () => {
    const tooltipElement = rootElement.querySelector(`.${CSS_CLASSES.TOOLTIP}`);
    expect(tooltipElement).toHaveTextContent(5);
    thumbInstance.updateValue(10);
    expect(tooltipElement).toHaveTextContent(10);
  });

  test('thumb must contain tooltip', () => {
    const tooltipElement = thumbEl.querySelector(`.${CSS_CLASSES.TOOLTIP}`);
    expect(thumbEl).toContainElement(tooltipElement);
  });

  test('thumb must not contain tooltip', () => {
    const thumb = new Thumb({
      rootElement,
      value: 5,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: true,
      enableTooltip: false,
    });
    const thumbElement = thumb.getElement();
    const tooltipElement = thumbElement.querySelector(
      `.${CSS_CLASSES.TOOLTIP}`
    );
    expect(thumbElement).not.toContainElement(tooltipElement);
  });

  test('thumb element must have vertical class', () => {
    expect(thumbEl).toHaveClass(CSS_CLASSES.THUMB_VERTICAL);
  });

  test('thumb element must not have vertical class', () => {
    const thumb = new Thumb({
      rootElement,
      value: 5,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: false,
      enableTooltip: false,
    });
    const thumbElement = thumb.getElement();
    expect(thumbElement).not.toHaveClass(CSS_CLASSES.THUMB_VERTICAL);
  });

  test('setActiveClass: should add active class', () => {
    thumbInstance.addActiveClass();
    expect(thumbEl).toHaveClass(CSS_CLASSES.THUMB_ACTIVE);
  });

  test('removeActiveClass: should remove active class', () => {
    thumbInstance.addActiveClass();
    expect(thumbEl).toHaveClass(CSS_CLASSES.THUMB_ACTIVE);
    thumbInstance.removeActiveClass();
    expect(thumbEl).not.toHaveClass(CSS_CLASSES.THUMB_ACTIVE);
  });

  test('updatePosition: should update thumb position', () => {
    thumbInstance.value = 9;
    thumbInstance.updatePosition();
    expect(thumbEl).toHaveStyle({ bottom: '90%' });
    thumbInstance.value = 3;
    thumbInstance.updatePosition();
    expect(thumbEl).toHaveStyle('bottom: 30%');
  });

  test('updatePosition: should update thumb position by vertical', () => {
    expect(thumbEl).toHaveStyle('bottom: 50%');
    thumbInstance.value = 10;
    thumbInstance.updatePosition();
    expect(thumbEl).toHaveStyle('bottom: 100%');
    thumbInstance.value = 3;
    thumbInstance.updatePosition();
    expect(thumbEl).toHaveStyle('bottom: 30%');
  });

  test('updatePosition: should update thumb position by horizontal', () => {
    const thumb = new Thumb({
      rootElement,
      value: 5,
      min: 0,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: false,
      enableTooltip: false,
    });
    const thumbElement = thumb.getElement();
    expect(thumbElement).toHaveStyle('left: 50%');
    thumb.value = 10;
    thumb.updatePosition();
    expect(thumbElement).toHaveStyle('left: 100%');
    thumb.value = 3;
    thumb.updatePosition();
    expect(thumbElement).toHaveStyle('left: 30%');
  });
});
