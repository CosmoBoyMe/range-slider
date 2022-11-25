import { getPercentOfValue } from "../../helpers";
import { CSS_CLASSES } from "../../const";
import type { IThumbArguments } from "../../types";
import { Tooltip } from "./Tooltip";

class Thumb {
  private rootElement: HTMLElement;

  private thumbEl: HTMLDivElement = document.createElement("div");

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
        rootElement: this.thumbEl,
        value,
        isVertical,
      });
    }
    this.render();
  }

  public getElement(): HTMLDivElement {
    return this.thumbEl;
  }

  public destroy(): void {
    this.thumbEl.remove();
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

  private checkTooltipOutsideBorder() {
    if (this.tooltipInstance === null || this.isVertical) {
      return;
    }
    const rootElWidth = rootElement.offsetWidth;
    const rootRecLeft = rootElement.getBoundingClientRect().left;
    const tooltipEl = tooltipInstance.getElement();
    const tooltipRecRight = tooltipEl.getBoundingClientRect().right;
    const tooltipEndPositionPx = tooltipRecRight - rootRecLeft;
    const tooltipOutsideInPX = rootElWidth - tooltipEndPositionPx;
    const isTooltipOnOutside = tooltipOutsideInPX < 0;
    if (isTooltipOnOutside && lastTranslateValue === null) {
      const translateValue = tooltipOutsideInPX;
      this.lastTranslateValue = translateValue;
      const translateProperty = `translate(${translateValue}px, 0)`;
      tooltipEl.style.setProperty("transform", translateProperty);
      this.lastOutsideValueTooltip = value;
    } else if (
      lastOutsideValueTooltip !== null &&
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
      this.lastOutsideValueTooltip = value;
    } else {
      this.lastOutsideValueTooltip = null;
      this.lastTranslateValue = null;
      tooltipEl.style.removeProperty("transform");
    }
  }

  private updatePosition(): void {
    if (this.isVertical) {
    } else {
      thumbEl.style.left = `${valueInPercent}%`;
      thumbEl.style.transform = `translate(-${valueInPercent}%, -50%)`;
    }

    this.checkTooltipOutsideBorder();
  }

  public addActiveClass(): void {
    this.thumbEl.classList.add(CSS_CLASSES.THUMB_ACTIVE);
  }

  public removeActiveClass(): void {
    this.thumbEl.classList.remove(CSS_CLASSES.THUMB_ACTIVE);
  }

  private toggleVerticalClass(): void {
    this.thumbEl.classList.toggle(CSS_CLASSES.THUMB_VERTICAL);
  }

  private render(): void {
    const {
      rootElement,
      thumbEl,
      handleThumbPointerDown,
      index,
      isVertical,
    }: Thumb = this;
    thumbEl.classList.add(CSS_CLASSES.THUMB);

    if (this.isVertical) {
      this.toggleVerticalClass();
    }
    thumbEl.addEventListener("pointerdown", (event) =>
      handleThumbPointerDown(event, index)
    );

    rootElement.append(thumbEl);
    this.updatePosition();
  }
}

export { Thumb };
