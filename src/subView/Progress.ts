import { getPercentOfValue } from '../helpers';
import { CSS_CLASSES } from '../const';

import type { IPropgessArguments } from '../types';

class Progress {
  private rootElement: HTMLElement;

  private values: number[];

  private min: number;

  private max: number;

  private range: boolean;

  private vertical: boolean;

  private progressEl: HTMLDivElement = document.createElement('div');

  constructor({
    rootElement, values, min, max, range, vertical,
  }: IPropgessArguments) {
    this.rootElement = rootElement;
    this.values = values;
    this.min = min;
    this.max = max;
    this.range = range;
    this.vertical = vertical;
    this.init();
  }

  public updateValues(newValues: number[]): void {
    this.values = newValues;
    this.updateProgressLenght();
    this.updatePosition();
  }

  public destroy():void {
    this.progressEl.remove();
  }

  public getElement():HTMLDivElement {
    return this.progressEl;
  }

  private updateProgressLenght():void {
    const {
      progressEl, values, min, max, range, vertical,
    }: Progress = this;
    let progressLenghtInPercent;
    if (range) {
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      const minValueInPercent = getPercentOfValue(minValue, min, max);
      const maxValueInPercent = getPercentOfValue(maxValue, min, max);
      progressLenghtInPercent = maxValueInPercent - minValueInPercent;
    } else {
      progressLenghtInPercent = getPercentOfValue(values[0], min, max);
    }

    vertical ? (progressEl.style.height = `${progressLenghtInPercent}%`)
      : (progressEl.style.width = `${progressLenghtInPercent}%`);
  }

  private toggleVerticalClass(this: Progress):void {
    const { progressEl, vertical } = this;
    if (vertical) {
      progressEl.classList.add(CSS_CLASSES.PROGRESS_VERTICAL);
    } else {
      progressEl.classList.remove(CSS_CLASSES.PROGRESS_VERTICAL);
    }
  }

  private updatePosition():void {
    const {
      min, max, values, progressEl, range, vertical,
    }: Progress = this;
    if (range) {
      const minValue = Math.min(...values);
      const positionInPercent = getPercentOfValue(minValue, min, max);
      vertical
        ? (progressEl.style.bottom = `${positionInPercent}%`)
        : (progressEl.style.left = `${positionInPercent}%`);
    } else {
      vertical
        ? (progressEl.style.bottom = '0%')
        : (progressEl.style.left = '0%');
    }
  }

  private init():void {
    const { progressEl }: Progress = this;
    progressEl.classList.add(CSS_CLASSES.PROGRESS);
    this.updateProgressLenght();
    this.updatePosition();
    this.rootElement.append(progressEl);
    this.toggleVerticalClass();
  }
}

export { Progress };
