import '@testing-library/jest-dom';

import { Tooltip } from '../../../View/subView';

describe('Track class:', () => {
  let rootElement;
  let tooltip;
  let tooltipElement;

  beforeEach(() => {
    rootElement = document.createElement('div');
    tooltip = new Tooltip(
      { rootElement, value: 5, isVertical: true },
    );
    tooltipElement = tooltip.getElement();
  });

  test('root element shold contain tooltip element', () => {
    expect(rootElement).toContainElement(tooltipElement);
  });

  test('shold destroy element', () => {
    tooltip.destroy();
    expect(rootElement).not.toContainElement(tooltipElement);
  });

  test('tooltip element should have text', () => {
    expect(tooltipElement).toHaveTextContent(5);
  });

  test('text should be updated', () => {
    tooltip.updateValue(10);
    expect(tooltipElement).toHaveTextContent(10);
  });

  test('muss have class "js-tooltip--vertical"', () => {
    expect(tooltipElement).toHaveClass('js-tooltip--vertical');
  });

  test('must not have a class "js-tootip--vertical"', () => {
    tooltip = new Tooltip({ rootElement, value: 5, isVertical: false });
    tooltipElement = tooltip.getElement();
    expect(tooltipElement).not.toHaveClass('js-tooltip--vertical');
  });
});
