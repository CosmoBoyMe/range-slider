import { getPercentOfValue, getClosestValue } from '../helpers';

import { CSS_CLASSES } from '../const';

import type { IScaleArguments } from '../types';

class Scale {
  rootDom: HTMLElement;

  scaleEl: HTMLDivElement = document.createElement('div');

  min: number;

  max: number;

  step: number;

  scaleCounts: number;

  vertical: boolean;

  handleScalePointClick: (event: MouseEvent) => void;

  constructor({
    rootDom,
    min,
    max,
    step,
    scaleCounts,
    vertical,
    handleScalePointClick,
  }: IScaleArguments) {
    this.rootDom = rootDom;
    this.min = min;
    this.max = max;
    this.step = step;
    this.vertical = vertical;
    this.scaleCounts = scaleCounts;
    this.handleScalePointClick = handleScalePointClick;
    this.render();
  }

  public destroy() {
    this.scaleEl.remove();
  }

  public getElement() {
    return this.scaleEl;
  }

  private createScalePoint(pointValue:number, min:number, max: number, vertical: boolean) {
    const pointEl = document.createElement('div');
    pointEl.classList.add(CSS_CLASSES.SCALE_POINT);
    pointEl.innerHTML = String(pointValue);
    const valuePercent = getPercentOfValue(pointValue, min, max);
    if (vertical) {
      pointEl.classList.add(CSS_CLASSES.SCALE_POINT_VERTICAL);
      pointEl.style.bottom = `${valuePercent}%`;
    } else {
      pointEl.style.left = `${valuePercent}%`;
    }
    pointEl.addEventListener('click', this.handleScalePointClick);
    return pointEl;
  }

  private getScaleValues(): number[] {
    const {
      min, max, scaleCounts, step,
    } = this;

    const values:number[] = [];
    const partsCountWithoutStart = scaleCounts - 1;
    const partStep = (max - min) / partsCountWithoutStart;
    for (let i = 0; i <= partsCountWithoutStart; i += 1) {
      let value;
      if (i === partsCountWithoutStart) {
        value = max;
      } else {
        value = getClosestValue(min, max, min + partStep * i, step);
      }
      values.push(value);
    }
    return values;
  }

  private deleteScalePointsWhenPointOverlap(this: Scale) {
    const { scaleEl } = this;
    const allPoints = [...scaleEl.children];
    allPoints.forEach((item, index) => {
      const currentItemRect = item.getBoundingClientRect();
      for (let i = index + 1; i < allPoints.length; i += 1) {
        const nextItem = allPoints[i];
        const nextItemRect = nextItem.getBoundingClientRect();
        const isOverplap = !(
          currentItemRect.top > nextItemRect.bottom
          || currentItemRect.right < nextItemRect.left
          || currentItemRect.bottom < nextItemRect.top
          || currentItemRect.left > nextItemRect.right
        );
        if (isOverplap) {
          if (scaleEl.contains(nextItem)) {
            scaleEl.removeChild(nextItem);
          }
        }
      }
    });
  }

  private render() {
    const {
      rootDom,
      scaleEl,
      scaleCounts, min, max, vertical,
    } = this;

    scaleEl.classList.add(CSS_CLASSES.SCALE);
    if (vertical) {
      scaleEl.classList.add(CSS_CLASSES.SCALE_VERTICAL);
    }
    const scaleValues = this.getScaleValues();
    const scalePoints = [];
    for (let i = 0; i < scaleCounts; i += 1) {
      const scalePoint = this.createScalePoint(
        scaleValues[i],
        min,
        max,
        vertical,
      );
      scalePoints.push(scalePoint);
    }

    scaleEl.append(...scalePoints);
    rootDom.append(scaleEl);
    this.deleteScalePointsWhenPointOverlap();
  }
}

export { Scale };
