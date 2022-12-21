import {
  getClosestValue,
  findNearestIndexToValue,
  getCurrentValueToStep,
} from "../helpers";
import { IOptions, IViewInstances } from "../types";
import { ObserverTypes, SliderClasses } from "../constants";
import { Observer } from "../Observer/Observer";
import { Scale, Track, Thumb, Progress } from "./subView";

class View extends Observer {
  private rootElement: HTMLElement;

  private options: IOptions;

  private track: Track | null = null;

  private thumbsInstance: Thumb[] = [];

  private progressInstance: Progress | null = null;

  private scaleInstance: Scale | null = null;

  private thumbWithMaxValueIndex = -1;

  private lastClickedThumbIndex: number | null = null;

  constructor(rootElement: HTMLElement, options: IOptions) {
    super();
    this.rootElement = rootElement;
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

  public getRootElement(): HTMLElement {
    return this.rootElement;
  }

  private getCurrentValueFromCoords(clientX: number, clientY: number): number {
    const { min, max, isVertical } = this.options;
    const coords = isVertical ? clientY : clientX;
    const startEdgeCoords = isVertical
      ? this.rootElement.getBoundingClientRect().bottom
      : this.rootElement.getBoundingClientRect().left;
    const maxOffsetInPx = isVertical
      ? this.rootElement.offsetHeight
      : this.rootElement.offsetWidth;
    let offsetInPx = isVertical
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

  private handleThumbPointerDown = (event: MouseEvent, index: number): void => {
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

    const getNewValue = (clientX: number, clientY: number): number => {
      const { min, max, step, values } = this.options;
      const valueFromCoords = this.getCurrentValueFromCoords(clientX, clientY);
      const prevValue = values[index];
      const newValue = getCurrentValueToStep(
        min,
        max,
        valueFromCoords,
        prevValue,
        step
      );
      const validatedNewValue = validateValue(newValue);
      return validatedNewValue;
    };

    const handlerDocumentPointerMove = ({
      clientX,
      clientY,
    }: PointerEvent): void => {
      const { values } = this.options;
      const newValue = getNewValue(clientX, clientY);
      const prevValue = values[index];
      if (newValue !== prevValue) {
        this.notify(ObserverTypes.UPDATE_VALUE, {
          value: newValue,
          index,
        });
      }
    };

    const handlerDocumentPointerUp = ({
      clientX,
      clientY,
    }: PointerEvent): void => {
      const newValue = getNewValue(clientX, clientY);
      this.notify(ObserverTypes.UPDATE_VALUE, { value: newValue, index });

      document.removeEventListener("pointerup", handlerDocumentPointerUp);
      document.removeEventListener("pointermove", handlerDocumentPointerMove);
    };

    document.addEventListener("pointermove", handlerDocumentPointerMove);
    document.addEventListener("pointerup", handlerDocumentPointerUp);

    const { target } = event;
    if (target instanceof HTMLDivElement) {
      target.ondragstart = () => false;
    }
  };

  public handleTrackClick = ({ clientX, clientY }: MouseEvent): void => {
    const currentValue = this.getCurrentValueFromCoords(clientX, clientY);
    const closestValue = getClosestValue(
      this.options.min,
      this.options.max,
      currentValue,
      this.options.step
    );
    this.updateClickedValue(closestValue);
  };

  private handleScaleClick = ({ target }: MouseEvent): void => {
    if (target instanceof HTMLDivElement) {
      const isTargetScalePoint = target.classList.contains(
        SliderClasses.SCALE_POINT
      );
      if (isTargetScalePoint) {
        const value = Number(target.textContent);
        this.updateClickedValue(value);
      }
    }
  };

  private updateClickedValue(value: number): void {
    let handleIndex = 0;

    if (this.options.values.length > 1) {
      handleIndex = findNearestIndexToValue(this.options.values, value);
    }
    this.notify(ObserverTypes.UPDATE_VALUE, { value, index: handleIndex });
  }

  private toggleActiveThumb(newClickedThumbIndex: null | number = null): void {
    const setActiveClassToThumbWithMaxValue = () => {
      const index = this.options.values.findIndex(
        (value) => value === this.options.max
      );
      if (index === -1) {
        this.thumbsInstance[this.thumbWithMaxValueIndex]?.removeActiveClass();
        this.thumbWithMaxValueIndex = index;
      } else {
        this.thumbsInstance[this.thumbWithMaxValueIndex]?.removeActiveClass();
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
      isVertical,
      withTooltip,
      withScale,
      withProgress,
    } = this.options;

    const isRange = values.length > 1;
    this.track = new Track({
      rootElement: this.rootElement,
      isVertical,
      handleTrackClick: this.handleTrackClick,
    });

    const trackElement = this.track.getElement();

    if (withProgress) {
      this.progressInstance = new Progress({
        rootElement: trackElement,
        values,
        min,
        max,
        withRange: isRange,
        isVertical,
      });
    }

    if (withScale) {
      this.scaleInstance = new Scale({
        rootElement: this.rootElement,
        min,
        max,
        step,
        scaleCounts,
        isVertical,
        handleScaleClick: this.handleScaleClick,
      });
    }

    this.thumbsInstance = values.map(
      (value, index) =>
        new Thumb({
          rootElement: trackElement,
          value,
          min,
          max,
          handleThumbPointerDown: this.handleThumbPointerDown,
          index,
          isVertical,
          withTooltip,
        })
    );

    this.toggleActiveThumb();
  }
}

export { View };
