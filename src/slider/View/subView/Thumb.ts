import { getPercentOfValue } from "../../helpers";
import { SliderClasses } from "../../constants";
import type { IThumbArguments } from "../../types";
import { Tooltip } from "./Tooltip";

class Thumb {
  private rootElement: HTMLElement;

  private thumbElement: HTMLDivElement = document.createElement("div");

  private value: number;

  private min: number;

  private max: number;

  private index: number;

  private isVertical: boolean;

  private withTooltip: boolean;

  private tooltipInstance: Tooltip | null = null;

  private lastOutsideValueTooltip: number | null = null;

  private lastTranslateValue: number | null = null;

  handleThumbPointerDown: (event: MouseEvent, index: number) => void;

  constructor({
    rootElement,
    value,
    min,
    max,
    handleThumbPointerDown,
    index,
    isVertical,
    withTooltip,
  }: IThumbArguments) {
    this.rootElement = rootElement;
    this.value = value;
    this.min = min;
    this.max = max;
    this.handleThumbPointerDown = handleThumbPointerDown;
    this.index = index;
    this.withTooltip = withTooltip;
    this.isVertical = isVertical;
    if (this.withTooltip) {
      this.tooltipInstance = new Tooltip({
        rootElement: this.thumbElement,
        value,
        isVertical,
      });
    }
    this.render();
  }

  public getElement(): HTMLDivElement {
    return this.thumbElement;
  }

  public destroy(): void {
    this.thumbElement.remove();
  }

  public getValue(): number {
    return this.value;
  }

  public getTooltipInstance(): Tooltip | null {
    return this.tooltipInstance;
  }

  public updateValue(newValue: number): void {
    this.value = newValue;
    if (this.tooltipInstance) {
      this.tooltipInstance.updateValue(newValue);
    }
    this.updatePosition();
  }

  public addActiveClass(): void {
    this.thumbElement.classList.add(SliderClasses.THUMB_ACTIVE);
  }

  public removeActiveClass(): void {
    this.thumbElement.classList.remove(SliderClasses.THUMB_ACTIVE);
  }

  private checkTooltipOutsideBorder() {
    if (this.tooltipInstance === null || this.isVertical) {
      return;
    }
    const rootElWidth = this.rootElement.offsetWidth;
    const rootRecLeft = this.rootElement.getBoundingClientRect().left;
    const tooltipEl = this.tooltipInstance.getElement();
    const tooltipRecRight = tooltipEl.getBoundingClientRect().right;
    const tooltipEndPositionPx = tooltipRecRight - rootRecLeft;
    const tooltipOutsideInPX = rootElWidth - tooltipEndPositionPx;
    const isTooltipOnOutside = tooltipOutsideInPX < 0;
    if (isTooltipOnOutside && this.lastTranslateValue === null) {
      const translateValue = tooltipOutsideInPX;
      this.lastTranslateValue = translateValue;
      const translateProperty = `translate(${translateValue}px, 0)`;
      tooltipEl.style.setProperty("transform", translateProperty);
      this.lastOutsideValueTooltip = this.value;
    } else if (
      this.lastOutsideValueTooltip !== null &&
      this.lastTranslateValue !== null &&
      this.lastTranslateValue < 0
    ) {
      const isTooltipNotOutside =
        this.lastTranslateValue + tooltipOutsideInPX > 0;
      if (isTooltipNotOutside) {
        this.lastOutsideValueTooltip = null;
        this.lastTranslateValue = null;
        tooltipEl.style.removeProperty("transform");
        return;
      }
      this.lastTranslateValue += tooltipOutsideInPX;
      const translateProperty = `translate(${this.lastTranslateValue}px, 0)`;
      tooltipEl.style.setProperty("transform", translateProperty);
      this.lastOutsideValueTooltip = this.value;
    } else {
      this.lastOutsideValueTooltip = null;
      this.lastTranslateValue = null;
      tooltipEl.style.removeProperty("transform");
    }
  }

  private updatePosition(): void {
    const valueInPercent = getPercentOfValue(this.value, this.min, this.max);
    if (this.isVertical) {
      this.thumbElement.style.bottom = `${valueInPercent}%`;
      this.thumbElement.style.transform = `translate(-50%, ${valueInPercent}%)`;
    } else {
      this.thumbElement.style.left = `${valueInPercent}%`;
      this.thumbElement.style.transform = `translate(-${valueInPercent}%, -50%)`;
    }

    this.checkTooltipOutsideBorder();
  }

  private toggleVerticalClass(): void {
    this.thumbElement.classList.toggle(SliderClasses.THUMB_VERTICAL);
  }

  private render(): void {
    this.thumbElement.classList.add(SliderClasses.THUMB);

    if (this.isVertical) {
      this.toggleVerticalClass();
    }
    this.thumbElement.addEventListener("pointerdown", (event) =>
      this.handleThumbPointerDown(event, this.index)
    );

    this.rootElement.append(this.thumbElement);
    this.updatePosition();
  }
}

export { Thumb };
