import { getPercentOfValue } from "../../helpers";
import { SliderClasses } from "../../constants";

interface IProgressArguments {
  rootElement: HTMLElement;
  values: number[];
  min: number;
  max: number;
  withRange: boolean;
  isVertical: boolean;
}

class Progress {
  private rootElement: HTMLElement;

  private values: number[];

  private min: number;

  private max: number;

  private withRange: boolean;

  private isVertical: boolean;

  private progressElement: HTMLDivElement = document.createElement("div");

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
    this.progressElement.remove();
  }

  public getElement(): HTMLDivElement {
    return this.progressElement;
  }

  private updateProgressLength(): void {
    let progressLengthInPercent;
    if (this.withRange) {
      const minValue = Math.min(...this.values);
      const maxValue = Math.max(...this.values);
      const minValueInPercent = getPercentOfValue(minValue, this.min, this.max);
      const maxValueInPercent = getPercentOfValue(maxValue, this.min, this.max);
      progressLengthInPercent = maxValueInPercent - minValueInPercent;
    } else {
      progressLengthInPercent = getPercentOfValue(
        this.values[0],
        this.min,
        this.max
      );
    }

    this.isVertical
      ? (this.progressElement.style.height = `${progressLengthInPercent}%`)
      : (this.progressElement.style.width = `${progressLengthInPercent}%`);
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
      const minValue = Math.min(...this.values);
      const positionInPercent = getPercentOfValue(minValue, this.min, this.max);
      this.isVertical
        ? (this.progressElement.style.bottom = `${positionInPercent}%`)
        : (this.progressElement.style.left = `${positionInPercent}%`);
    } else {
      this.isVertical
        ? (this.progressElement.style.bottom = "0%")
        : (this.progressElement.style.left = "0%");
    }
  }

  private init(): void {
    this.progressElement.classList.add(SliderClasses.PROGRESS);
    this.updateProgressLength();
    this.updatePosition();
    this.rootElement.append(this.progressElement);
    this.toggleVerticalClass();
  }
}

export { Progress };
