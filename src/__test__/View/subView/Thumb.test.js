/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';

import { Thumb } from '../../../View/subView';

describe('Thumb class:', () => {
  let rootElement;

  beforeEach(() => {
    rootElement = document.createElement('div');
  });

  test('root element shold contain thumb element', () => {
    const thumb = new Thumb({
      rootElement,
      value: 5,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: true,
      enableTooltip: true,
    });
    const thumbEl = thumb.getElement();
    expect(rootElement).toContainElement(thumbEl);
  });

  test('root element to be empty element', () => {
    const thumb = new Thumb({
      rootElement,
      value: 5,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: true,
      enableTooltip: true,
    });
    thumb.destroy();
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
    const thumb = new Thumb({
      rootElement,
      value: 5,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: true,
      enableTooltip: true,
    });
    const tooltipElement = rootElement.querySelector('.js-tooltip');
    expect(tooltipElement).toHaveTextContent(5);
    thumb.updateValue(10);
    expect(tooltipElement).toHaveTextContent(10);
  });

  test('thumb must contain tooltip', () => {
    const thumb = new Thumb({
      rootElement,
      value: 5,
      min: 1,
      max: 10,
      index: 0,
      handleThumbMouseDown: (event, index) => undefined,
      isVertical: true,
      enableTooltip: true,
    });
    const thumbElement = thumb.getElement();
    const tooltipElement = thumbElement.querySelector('.js-tooltip');
    expect(thumbElement).toContainElement(tooltipElement);
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
    const tooltipElement = thumbElement.querySelector('.js-tooltip');
    expect(thumbElement).not.toContainElement(tooltipElement);
  });

  test('thumb element must have vertical class', () => {
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
    expect(thumbElement).toHaveClass('js-thumb--vertical');
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
    expect(thumbElement).not.toHaveClass('js-thumb--vertical');
  });
});
