/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';
import { Scale } from '../../subView';

describe('Scale class:', () => {
  let rootElement;
  let scale;
  let scaleEl;

  beforeAll(() => {
    rootElement = document.createElement('div');
    scale = new Scale({
      rootDom: rootElement,
      min: 1,
      max: 10,
      step: 1,
      scaleCounts: 10,
      vertical: false,
      handleScalePointClick: (event) => undefined,
    });
    scaleEl = scale.getElement();
  });

  test('root element must contain scale element', () => {
    expect(rootElement).toContainElement(scaleEl);
  });

  test('scale element must be remove from root element', () => {
    scale.destroy();
    expect(rootElement).not.toContainElement(scaleEl);
  });

  test('scale element must have vertical class', () => {
    const scaleVertical = new Scale({
      rootDom: rootElement,
      min: 1,
      max: 10,
      step: 1,
      scaleCounts: 10,
      vertical: true,
      handleScalePointClick: (event) => undefined,
    });
    const scaleVerticalElemenet = scaleVertical.getElement();
    expect(scaleVerticalElemenet).toHaveClass('js-scale--vertical');
  });

  test('scale element must not have vertical class', () => {
    expect(scaleEl).not.toHaveClass('js-scale--vertical');
  });
});
