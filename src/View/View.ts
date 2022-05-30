import {
  getClosestValue,
  findNearestIndexToValue,
  getCurrentValueToStep,
} from '../helpers';

import { IOptions, IViewInstances } from '../types';

import { ObserverTypes, CSS_CLASSES } from '../const';

import { Observer } from '../Observer/Observer';

import { Scale, Track, Thumb, Progress } from './subView/index';

class View extends Observer {
  private sliderElement: HTMLDivElement = document.createElement('div');

  private options: IOptions;

  private track: Track | null = null;

  private thumbsInstance: Thumb[] = [];

  private progressInstance: Progress | null = null;

  private scaleInstance: Scale | null = null;

  private thumbWithMaxValueIndex = -1;

  private lastClickedThumbIndex: number | null = null;

  constructor(domRoot: HTMLElement, options: IOptions) {
    super();
    this.sliderElement.classList.add(CSS_CLASSES.SLIDER);
    domRoot.append(this.sliderElement);
    this.options = JSON.parse(JSON.stringify(options));
    this.render();
  }

  public getAllInstance(): IViewInstances {
    return {
      track: this.track,
      thumbs: this.thumbsInstance,
      progress: this.progressInstance,
      scale: this.scaleInstance,
    };
  }

  public updateValue({ value, index }: { value: number; index: number }): void {
    this.options.values[index] = value;
    this.thumbsInstance[index].updateValue(value);
    if (this.progressInstance) {
      this.progressInstance.updateValues(this.options.values);
    }
    this.toggleActiveThumb(index);
  }

  public updateOptions(newOptions: IOptions): void {
    this.options = newOptions;
    this.destroyAllInstances();
    this.render();
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public getSliderElement(): HTMLDivElement {
    return this.sliderElement;
  }

  private getCurrentValueFromCoords(clientX: number, clientY: number): number {
    const { min, max, vertical } = this.options;
    const coords = vertical ? clientY : clientX;
    const startEdgeCoords = vertical
      ? this.sliderElement.getBoundingClientRect().bottom
      : this.sliderElement.getBoundingClientRect().left;
    const maxOffsetInPx = vertical
      ? this.sliderElement.offsetHeight
      : this.sliderElement.offsetWidth;
    let offsetInPx = vertical
      ? startEdgeCoords - coords
      : coords - startEdgeCoords;

    if (offsetInPx < 0) {
      offsetInPx = 0;
    }

    if (offsetInPx > maxOffsetInPx) {
      offsetInPx = maxOffsetInPx;
    }
    const valueInPercent = offsetInPx / (maxOffsetInPx / 100);
    const currentValue = (valueInPercent * (max - min)) / 100 + min;
    return currentValue;
  }

  private destroyAllInstances(): void {
    this.track?.destroy();
    this.progressInstance?.destroy();
    this.thumbsInstance.forEach((thumbInstance) => thumbInstance.destroy());
    this.scaleInstance?.destroy();
    this.progressInstance?.destroy();
  }

  private handleThumbPointerDown(event: MouseEvent, index: number): void {
    event.stopPropagation();
    event.preventDefault();

    const validateValue = (value: number): number => {
      const { min, max, values } = this.options;
      const prevThumbValue = values[index - 1] ?? min;
      const nextThumbValue = values[index + 1] ?? max;
      if (value < prevThumbValue) {
        return prevThumbValue;
      }
      if (value > nextThumbValue) {
        return nextThumbValue;
      }
      return value;
    };

    const handlerDocumentPointerMove = ({
      clientX,
      clientY,
    }: PointerEvent): void => {
      const currentValue = this.getCurrentValueFromCoords(clientX, clientY);
      const validatedValue = validateValue(currentValue);
      const currentThumb = this.thumbsInstance[index];
      currentThumb.updatePosition(validatedValue);
    };

    const handlerDocumentPointerUp = ({
      clientX,
      clientY,
    }: PointerEvent): void => {
      const { min, max, step, values } = this.options;
      const valueFromCoords = this.getCurrentValueFromCoords(clientX, clientY);
      const prevValue = values[index];
      const currentValue = getCurrentValueToStep(
        min,
        max,
        valueFromCoords,
        prevValue,
        step
      );
      const validatedValue = validateValue(currentValue);
      this.notify(ObserverTypes.UPDATE_VALUE, { value: validatedValue, index });

      document.removeEventListener('pointerup', handlerDocumentPointerUp);
      document.removeEventListener('pointermove', handlerDocumentPointerMove);
    };

    document.addEventListener('pointermove', handlerDocumentPointerMove);
    document.addEventListener('pointerup', handlerDocumentPointerUp);

    const { target } = event;
    if (target) {
      (target as HTMLDivElement).ondragstart = () => false;
    }
  }

  public handleTrackClick(event: MouseEvent): void {
    const { clientX, clientY } = event;
    const { min, max, step } = this.options;
    const currentValue = this.getCurrentValueFromCoords(clientX, clientY);
    const closestValue = getClosestValue(min, max, currentValue, step);
    this.updateClickedValue(closestValue);
  }

  private handleScaleClick(event: MouseEvent): void {
    const { target } = event;
    const isTargetScalePoint = (target as HTMLDivElement).classList.contains(
      CSS_CLASSES.SCALE_POINT
    );
    if (isTargetScalePoint) {
      const value = Number((target as HTMLDivElement).textContent);
      this.updateClickedValue(value);
    }
  }

  private updateClickedValue(value: number): void {
    const { values } = this.options;
    let handleIndex = 0;

    if (values.length > 1) {
      handleIndex = findNearestIndexToValue(values, value);
    }
    this.notify(ObserverTypes.UPDATE_VALUE, { value, index: handleIndex });
  }

  private toggleActiveThumb(newClickedThumbIndex: null | number = null): void {
    const { values, max } = this.options;
    const { thumbWithMaxValueIndex } = this;
    const setActiveClassToThumbWithMaxValue = () => {
      const index = values.findIndex((value) => value === max);
      if (index === -1) {
        this.thumbsInstance[thumbWithMaxValueIndex]?.removeActiveClass();
        this.thumbWithMaxValueIndex = index;
      } else {
        this.thumbsInstance[thumbWithMaxValueIndex]?.removeActiveClass();
        this.thumbsInstance[index].addActiveClass();
        this.thumbWithMaxValueIndex = index;
      }
    };

    const setActiveClassToCurrentThumb = () => {
      if (newClickedThumbIndex !== null) {
        if (this.lastClickedThumbIndex !== null) {
          this.thumbsInstance[this.lastClickedThumbIndex].removeActiveClass();
        }
        this.thumbsInstance[newClickedThumbIndex].addActiveClass();
        this.lastClickedThumbIndex = newClickedThumbIndex;
      }
    };

    setActiveClassToThumbWithMaxValue();
    setActiveClassToCurrentThumb();
  }

  private render(): void {
    const {
      min,
      max,
      step,
      values,
      scaleCounts,
      vertical,
      tooltip,
      scale,
      progress,
    } = this.options;

    const isRange = values.length > 1;
    this.track = new Track({
      element: this.sliderElement,
      isVertical: vertical,
      handleTrackClick: this.handleTrackClick.bind(this),
    });

    const trackElement = this.track.getElement();

    if (progress) {
      this.progressInstance = new Progress({
        rootElement: trackElement,
        values,
        min,
        max,
        range: isRange,
        vertical,
      });
    }

    if (scale) {
      this.scaleInstance = new Scale({
        rootDom: this.sliderElement,
        min,
        max,
        step,
        scaleCounts,
        vertical,
        handleScaleClick: this.handleScaleClick.bind(this),
      });
    }

    this.thumbsInstance = values.map(
      (value, index) =>
        new Thumb({
          rootElement: trackElement,
          value,
          min,
          max,
          handleThumbPointerDown: this.handleThumbPointerDown.bind(this),
          index,
          isVertical: vertical,
          enableTooltip: tooltip,
        })
    );
    this.toggleActiveThumb();
  }
}

export { View };
