import { getPercentOfValue } from "../../helpers";
import { SliderClasses } from "../../const";
import type { IProgressArguments } from "../../types";

class Progress {
  private rootElement: HTMLElement;

  private values: number[];

  private min: number;

  private max: number;

  private withRange: boolean;

  private isVertical: boolean;

  private progressEl: HTMLDivElement = document.createElement("div");

  constructor({
    rootElement,
    values,
    min,
    max,
    withRange,
    isVertical,
  }: IProgressArguments) {
    this.rootElement = rootElement;
    this.values = values;
    this.min = min;
    this.max = max;
    this.withRange = withRange;
    this.isVertical = isVertical;
    this.init();
  }

  public updateValues(newValues: number[]): void {
    this.values = newValues;
    this.updateProgressLength();
    this.updatePosition();
  }

  public destroy(): void {
    this.progressEl.remove();
  }

  public getElement(): HTMLDivElement {
    return this.progressEl;
  }

  private updateProgressLength(): void {
    const { progressEl, values, min, max, range, vertical }: Progress = this;
    let progressLengthInPercent;
    if (this.withRange) {
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      const minValueInPercent = getPercentOfValue(minValue, min, max);
      const maxValueInPercent = getPercentOfValue(maxValue, min, max);
      progressLengthInPercent = maxValueInPercent - minValueInPercent;
    } else {
      progressLengthInPercent = getPercentOfValue(values[0], min, max);
    }

    this.isVertical
      ? (progressEl.style.height = `${progressLengthInPercent}%`)
      : (progressEl.style.width = `${progressLengthInPercent}%`);
  }

  private toggleVerticalClass(this: Progress): void {
    if (this.isVertical) {
      this.progressElement.classList.add(SliderClasses.PROGRESS_VERTICAL);
    } else {
      this.progressElement.classList.remove(SliderClasses.PROGRESS_VERTICAL);
    }
  }

  private updatePosition(): void {
    if (this.withRange) {
      this.isVertical;
    } else {
      this.isVertical
        ? (progressEl.style.bottom = "0%")
        : (progressEl.style.left = "0%");
    }
  }

  private init(): void {
    this.progressElement.classList.add(SliderClasses.PROGRESS);
    this.updateProgressLength();
    this.updatePosition();
    this.rootElement.append(progressEl);
    this.toggleVerticalClass();
  }
}

export { Progress };
