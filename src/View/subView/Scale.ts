import { getPercentOfValue, getClosestValue } from "../../helpers";
import { CSS_CLASSES } from "../../const";
import type { IScaleArguments } from "../../types";

class Scale {
  rootDom: HTMLElement;

  scaleEl: HTMLDivElement = document.createElement("div");

  min: number;

  max: number;

  step: number;

  scaleCounts: number;

  isVertical: boolean;

  handleScaleClick: (event: MouseEvent) => void;

  constructor({
    rootDom,
    min,
    max,
    step,
    scaleCounts,
    isVertical,
    handleScaleClick,
  }: IScaleArguments) {
    this.rootDom = rootDom;
    this.min = min;
    this.max = max;
    this.step = step;
    this.isVertical = isVertical;
    this.scaleCounts = scaleCounts;
    this.handleScaleClick = handleScaleClick;
    this.render();
  }

  public destroy(): void {
    this.scaleEl.remove();
  }

  public getElement(): HTMLDivElement {
    return this.scaleEl;
  }

  private createScalePoint(pointValue: number): HTMLDivElement {
    const { min, max, vertical } = this;
    const pointEl = document.createElement("div");
    pointEl.classList.add(CSS_CLASSES.SCALE_POINT);
    pointEl.innerHTML = String(pointValue);
    const valuePercent = getPercentOfValue(pointValue, min, max);
    if (this.isVertical) {
      pointEl.classList.add(CSS_CLASSES.SCALE_POINT_VERTICAL);
      pointEl.style.bottom = `${valuePercent}%`;
      pointEl.style.transform = `translate(0, ${valuePercent}%)`;
    } else if (pointValue === max) {
      pointEl.style.right = `${0}%`;
      pointEl.style.transform = `translate(0)`;
    } else {
      const offsetToThumb = (20 / 100) * valuePercent;
      pointEl.style.left = `calc(${valuePercent}% - ${offsetToThumb}px)`;
      pointEl.style.transform = "none";
    }
    return pointEl;
  }

  private getScaleValues(): number[] {
    const { min, max, scaleCounts, step } = this;

    const values: number[] = [];
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

  private deleteScalePointsWhenPointOverlap(this: Scale): void {
    const { scaleEl } = this;
    const allPoints = [...scaleEl.children];
    allPoints.forEach((item, index) => {
      const currentItemRect = item.getBoundingClientRect();
      for (let i = index + 1; i < allPoints.length; i += 1) {
        const nextItem = allPoints[i];
        const nextItemRect = nextItem.getBoundingClientRect();
        const isOverlap = !(
          currentItemRect.top > nextItemRect.bottom ||
          currentItemRect.right < nextItemRect.left ||
          currentItemRect.bottom < nextItemRect.top ||
          currentItemRect.left > nextItemRect.right
        );
        if (isOverlap) {
          const lastItem = allPoints[allPoints.length - 1];
          if (nextItem === lastItem) {
            allPoints[index].remove();
          } else if (scaleEl.contains(nextItem)) {
            nextItem.remove();
          }
        }
      }
    });
  }

  private render(): void {
    if (this.isVertical) {
    }

    rootDom.append(scaleEl);

    const scaleValues = this.getScaleValues();
    const scalePoints = [];
    for (let i = 0; i < scaleCounts; i += 1) {
      const scalePoint = this.createScalePoint(scaleValues[i]);
      scalePoints.push(scalePoint);
    }
    scaleEl.append(...scalePoints);
    scaleEl.addEventListener("click", this.handleScaleClick);
    this.deleteScalePointsWhenPointOverlap();
  }
}

export { Scale };
