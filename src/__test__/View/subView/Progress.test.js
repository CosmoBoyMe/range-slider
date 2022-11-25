import "@testing-library/jest-dom";

import { Progress } from "../../../View/subView";

describe("Progress class", () => {
  let rootElement;
  let progressInstance;
  let progressElement;
  beforeEach(() => {
    rootElement = document.createElement("div");
    progressInstance = new Progress({
      rootElement,
      values: [10],
      min: 0,
      max: 20,
      withRange: false,
      isVertical: false,
    });
    progressElement = progressInstance.getElement();
  });

  test("rootElement must not contain progress element", () => {
    progressInstance.destroy();
    expect(rootElement).not.toContainElement(progressElement);
  });

  test("rootElement must contain progress element", () => {
    expect(rootElement).toContainElement(progressElement);
  });

  test("progress element must update progress width", () => {
    const { width } = progressElement.style;
    const parsedWidth = Number(parseInt(width, 10));
    expect(parsedWidth).toBe(50);
    progressInstance.updateValues([5]);
    const newWidth = progressElement.style.width;
    const newParsedWidth = Number(parseInt(newWidth, 10));
    expect(newParsedWidth).toBe(25);
  });

  test("progress element must update progress height", () => {
    const verticalProgressInstance = new Progress({
      rootElement,
      values: [10],
      min: 0,
      max: 20,
      withRange: false,
      isVertical: true,
    });
    const verticalProgressElement = verticalProgressInstance.getElement();
    const { height } = verticalProgressElement.style;
    const parsedHeight = Number(parseInt(height, 10));
    expect(parsedHeight).toBe(50);
    verticalProgressInstance.updateValues([5]);
    const newHeight = verticalProgressElement.style.height;
    const newParsedHeight = Number(parseInt(newHeight, 10));
    expect(newParsedHeight).toBe(25);
  });

  test("progress element must update progress width by range", () => {
    const rangeProgressInstance = new Progress({
      rootElement,
      values: [5, 10],
      min: 0,
      max: 20,
      withRange: true,
      isVertical: false,
    });
    const rangeProgressElement = rangeProgressInstance.getElement();

    const { width } = rangeProgressElement.style;
    const parsedWidth = Number(parseInt(width, 10));
    expect(parsedWidth).toBe(25);
    rangeProgressInstance.updateValues([0, 20]);
    const newWidth = rangeProgressElement.style.width;
    const newParsedHWidth = Number(parseInt(newWidth, 10));
    expect(newParsedHWidth).toBe(100);
  });

  test("progress element must update progress height by range", () => {
    const verticalAndRangeProgressInstance = new Progress({
      rootElement,
      values: [5, 10],
      min: 0,
      max: 20,
      withRange: true,
      isVertical: true,
    });
    const verticalAndRangeProgressElement =
      verticalAndRangeProgressInstance.getElement();

    const { height } = verticalAndRangeProgressElement.style;
    const parsedHeight = Number(parseInt(height, 10));
    expect(parsedHeight).toBe(25);
    verticalAndRangeProgressInstance.updateValues([0, 20]);
    const newHeight = verticalAndRangeProgressElement.style.height;
    const newParsedHeight = Number(parseInt(newHeight, 10));
    expect(newParsedHeight).toBe(100);
  });
});
