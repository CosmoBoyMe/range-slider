import { Tooltip } from './Tooltip';

import { getPercentOfValue } from '../helpers';
import { CSS_CLASSES } from '../const';

import type { IThumbArguments } from '../types';

class Thumb {
  private rootElement: HTMLElement;

  private thumbEl: HTMLDivElement = document.createElement('div');

  private value: number;

  private min: number;

  private max: number;

  private index: number;

  private isVertical: boolean;

  private enableTooltip: boolean;

  private tooltipInstance: Tooltip | null = null;

  handleThumbPointerDown: (event: MouseEvent, index: number) => void;

  constructor(
    {
      rootElement,
      value,
      min,
      max,
      handleThumbPointerDown,
      index,
      isVertical,
      enableTooltip,
    }: IThumbArguments,
  ) {
    this.rootElement = rootElement;
    this.value = value;
    this.min = min;
    this.max = max;
    this.handleThumbPointerDown = handleThumbPointerDown;
    this.index = index;
    this.enableTooltip = enableTooltip;
    this.isVertical = isVertical;
    if (this.enableTooltip) {
      this.tooltipInstance = new Tooltip({ rootElement: this.thumbEl, value, isVertical });
    }
    this.render();
  }

  public getElement():HTMLDivElement {
    return this.thumbEl;
  }

  public destroy():void {
    this.thumbEl.remove();
  }

  public getValue():number {
    return this.value;
  }

  public updateValue(newValue: number):void {
    this.value = newValue;
    if (this.tooltipInstance) {
      this.tooltipInstance.updateValue(newValue);
    }
    this.updatePosition();
  }

  private updatePosition():void {
    const {
      value, min, max, isVertical, thumbEl,
    } = this;
    isVertical
      ? (thumbEl.style.bottom = `${getPercentOfValue(value, min, max)}%`)
      : (thumbEl.style.left = `${getPercentOfValue(value, min, max)}%`);
  }

  private toggleVerticalClass():void {
    this.thumbEl.classList.toggle(CSS_CLASSES.THUMB_VERTICAL);
  }

  private render():void {
    const {
      rootElement, thumbEl, handleThumbPointerDown, index, isVertical,
    }: Thumb = this;
    thumbEl.classList.add(CSS_CLASSES.THUMB);

    if (isVertical) {
      this.toggleVerticalClass();
    }

    this.updatePosition();
    thumbEl.addEventListener('pointerdown', (event) => handleThumbPointerDown(event, index));

    rootElement.append(thumbEl);
  }
}

export { Thumb };
