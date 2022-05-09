import { getClosestValue, findNearestIndexToValue } from '../helpers';

import { IOptions, IViewInstances } from '../types';

import { ObserverTypes, CSS_CLASSES } from '../const';

import { Observer } from '../Observer/Observer';

import {
  Scale, Track, Thumb, Progress,
} from '../subView/index';

class View extends Observer {
  private sliderElement: HTMLDivElement = document.createElement('div');

  private options: IOptions;

  private track: Track | null = null;

  private thumbsInstance: Thumb[] = [];

  private progessInstance: Progress | null = null;

  private scaleInstance: Scale | null = null;

  constructor(domRoot: HTMLElement, options: IOptions) {
    super();
    this.sliderElement.classList.add(CSS_CLASSES.SLIDER);
    domRoot.append(this.sliderElement);
    this.options = options;
    this.render();
  }

  public getAllInstance(): IViewInstances {
    return {
      track: this.track,
      thumbs: this.thumbsInstance,
      progress: this.progessInstance,
      scale: this.scaleInstance,
    };
  }

  public updateValue({ value, index }: {value: number, index: number}): void {
    this.options.values[index] = value;
    this.thumbsInstance[index].updateValue(value);
    if (this.progessInstance) {
      this.progessInstance.updateValues(this.options.values);
    }
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

  private getCurrentValueFromCoords(clientX:number, clientY:number): number {
    const {
      min, max, step, vertical,
    } = this.options;
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
    const nearestValue = getClosestValue(min, max, currentValue, step);
    return nearestValue;
  }

  private destroyAllInstances(): void {
    this.track?.destroy();
    this.progessInstance?.destroy();
    this.thumbsInstance.forEach((thumbInstance) => thumbInstance.destroy());
    this.scaleInstance?.destroy();
    this.progessInstance?.destroy();
  }

  private handleThumbMouseDown(event: MouseEvent, index:number):void {
    event.preventDefault();
    const onMouseMove = ({ clientX, clientY }: PointerEvent) => {
      const currentValue = this.getCurrentValueFromCoords(clientX, clientY);
      if (currentValue !== this.options.values[index]) {
        this.notify(ObserverTypes.UPDATE_VALUE, { value: currentValue, index });
      }
    };

    const onMouseUp = ():void => {
      document.removeEventListener('pointerup', onMouseUp);
      document.removeEventListener('pointermove', onMouseMove);
    };

    document.addEventListener('pointermove', onMouseMove);

    document.addEventListener('pointerup', onMouseUp);
    const { target } = event;
    if (target) {
      (target as HTMLDivElement).ondragstart = () => false;
    }
  }

  public handleTrackClick(event: MouseEvent):void {
    const { clientX, clientY } = event;
    const currentValue = this.getCurrentValueFromCoords(clientX, clientY);
    this.updateClickedValue(currentValue);
  }

  private handleScaleClick(event: MouseEvent):void {
    const { target } = event;
    if (target) {
      const value = Number((target as HTMLDivElement).innerText);
      this.updateClickedValue(value);
    }
  }

  private updateClickedValue(value: number):void {
    const { values } = this.options;
    let handleIndex = 0;

    if (values.length > 1) {
      handleIndex = findNearestIndexToValue(values, value);
    }

    this.notify(ObserverTypes.UPDATE_VALUE, { value, index: handleIndex });
  }

  private render():void {
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
      this.progessInstance = new Progress({
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
      (value, index) => new Thumb({
        rootElement: trackElement,
        value,
        min,
        max,
        handleThumbMouseDown: this.handleThumbMouseDown.bind(this),
        index,
        isVertical: vertical,
        enableTooltip: tooltip,
      }),
    );
  }
}

export { View };
