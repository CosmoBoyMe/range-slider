import { getPercentOfValue, getClosestValue } from "../../helpers";
import { SliderClasses } from "../../const";
import type { IScaleArguments } from "../../types";

class Scale {
  rootElement: HTMLElement;

  scaleElement: HTMLDivElement = document.createElement("div");

  min: number;

  max: number;

  step: number;

  scaleCounts: number;

  isVertical: boolean;

  handleScaleClick: (event: MouseEvent) => void;

  constructor({
    rootElement,
    min,
    max,
    step,
    scaleCounts,
    isVertical,
    handleScaleClick,
  }: IScaleArguments) {
    this.rootElement = rootElement;
    this.min = min;
    this.max = max;
    this.step = step;
    this.isVertical = isVertical;
    this.scaleCounts = scaleCounts;
    this.handleScaleClick = handleScaleClick;
    this.render();
  }

  public destroy(): void {
    this.scaleElement.remove();
  }

  public getElement(): HTMLDivElement {
    return this.scaleElement;
  }

  private createScalePoint(pointValue: number): HTMLDivElement {
    const pointElement = document.createElement("div");
    pointElement.classList.add(SliderClasses.SCALE_POINT);
    pointElement.innerHTML = String(pointValue);

    const valueInPercent = getPercentOfValue(pointValue, this.min, this.max);
    if (this.isVertical) {
      pointElement.classList.add(SliderClasses.SCALE_POINT_VERTICAL);
      pointElement.style.bottom = `${valueInPercent}%`;
      pointElement.style.transform = `translate(0, ${valueInPercent}%)`;
    } else if (pointValue === this.max) {
      pointElement.style.right = "0%";
      pointElement.style.transform = `translate(0)`;
    } else {
      const offsetToThumb = (20 / 100) * valueInPercent;
      pointElement.style.left = `calc(${valueInPercent}% - ${offsetToThumb}px)`;
      pointElement.style.transform = "none";
    }
    return pointElement;
  }

  private getScaleValues(): number[] {
    const values: number[] = [];
    const partsCountWithoutStart = this.scaleCounts - 1;
    const partStep = (this.max - this.min) / partsCountWithoutStart;
    for (let index = 0; index <= partsCountWithoutStart; index += 1) {
      let value;
      if (index === partsCountWithoutStart) {
        value = this.max;
      } else {
        value = getClosestValue(
          this.min,
          this.max,
          this.min + partStep * index,
          this.step
        );
      }
      values.push(value);
    }
    return values;
  }

  private deleteScalePointsWhenPointOverlap(this: Scale): void {
    const allPoints = [...this.scaleElement.children];
    allPoints.forEach((item, index) => {
      const currentItemRect = item.getBoundingClientRect();
      for (let j = index + 1; j < allPoints.length; j += 1) {
        const nextItem = allPoints[j];
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
          } else if (this.scaleElement.contains(nextItem)) {
            nextItem.remove();
          }
        }
      }
    });
  }

  private render(): void {
    this.scaleElement.classList.add(SliderClasses.SCALE);
    if (this.isVertical) {
      this.scaleElement.classList.add(SliderClasses.SCALE_VERTICAL);
    }

    this.rootElement.append(this.scaleElement);

    const scaleValues = this.getScaleValues();
    const scalePoints = [];
    for (let index = 0; index < this.scaleCounts; index += 1) {
      const scalePoint = this.createScalePoint(scaleValues[index]);
      scalePoints.push(scalePoint);
    }
    this.scaleElement.append(...scalePoints);
    this.scaleElement.addEventListener("click", this.handleScaleClick);
    this.deleteScalePointsWhenPointOverlap();
  }
}

export { Scale };
