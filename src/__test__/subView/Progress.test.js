import '@testing-library/jest-dom';
import { Progress } from '../../subView';

describe('Progress class', () => {
  let rootElement = document.createElement('div');
  let progress;
  let progressEl;
  beforeEach(() => {
    rootElement = document.createElement('div');
    progress = new Progress(
      {
        rootElement, values: [10], min: 0, max: 20, range: false, vertical: false,
      },
    );
    progressEl = progress.getElement();
  });

  test('rootElement must not contain progress element', () => {
    progress.destroy();
    expect(rootElement).not.toContainElement(progressEl);
  });

  test('rootElement must contain progress element', () => {
    expect(rootElement).toContainElement(progressEl);
  });

  test('progress element must update progress width', () => {
    const { width } = progressEl.style;
    const parsedWidth = Number(parseInt(width, 10));
    expect(parsedWidth).toBe(50);
    progress.updateValues([5]);
    const newWidth = progressEl.style.width;
    const newParsedWidth = Number(parseInt(newWidth, 10));
    expect(newParsedWidth).toBe(25);
  });

  test('progress element must update progress height', () => {
    const verticalProgress = new Progress(
      {
        rootElement, values: [10], min: 0, max: 20, range: false, vertical: true,
      },
    );
    const verticalProgressEl = verticalProgress.getElement();
    const { height } = verticalProgressEl.style;
    const parsedHeight = Number(parseInt(height, 10));
    expect(parsedHeight).toBe(50);
    verticalProgress.updateValues([5]);
    const newHeight = verticalProgressEl.style.height;
    const newParsedHeight = Number(parseInt(newHeight, 10));
    expect(newParsedHeight).toBe(25);
  });

  test('progress element must update progress width by range', () => {
    const rangeProgress = new Progress(
      {
        rootElement, values: [5, 10], min: 0, max: 20, range: true, vertical: false,
      },
    );
    const rangeProgressEl = rangeProgress.getElement();

    const { width } = rangeProgressEl.style;
    const parsedWidth = Number(parseInt(width, 10));
    expect(parsedWidth).toBe(25);
    rangeProgress.updateValues([0, 20]);
    const newWidth = rangeProgressEl.style.width;
    const newParsedHWidth = Number(parseInt(newWidth, 10));
    expect(newParsedHWidth).toBe(100);
  });

  test('progress element must update progress height by range', () => {
    const verticalAndRangeProgress = new Progress(
      {
        rootElement, values: [5, 10], min: 0, max: 20, range: true, vertical: true,
      },
    );
    const verticalAndRangeProgressEl = verticalAndRangeProgress.getElement();

    const { height } = verticalAndRangeProgressEl.style;
    const parsedHeight = Number(parseInt(height, 10));
    expect(parsedHeight).toBe(25);
    verticalAndRangeProgress.updateValues([0, 20]);
    const newHeight = verticalAndRangeProgressEl.style.height;
    const newParsedHeight = Number(parseInt(newHeight, 10));
    expect(newParsedHeight).toBe(100);
  });
});
