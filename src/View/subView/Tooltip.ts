import { CSS_CLASSES } from "../../const";
import type { ITooltipArguments } from "../../types";

class Tooltip {
  private rootElement: HTMLElement;

  private value: number;

  private isVertical: boolean;

  private tooltipEl: HTMLDivElement = document.createElement("div");

  constructor({ rootElement, value, isVertical }: ITooltipArguments) {
    this.rootElement = rootElement;
    this.value = value;
    this.isVertical = isVertical;
    this.render();
  }

  public destroy(): void {
    this.tooltipEl.remove();
  }

  public getElement(): HTMLDivElement {
    return this.tooltipEl;
  }

  public updateValue(newValue: number): void {
    this.value = newValue;
    this.updateInnerText();
  }

  public toggleVerticalClass(): void {
    this.tooltipEl.classList.toggle(CSS_CLASSES.TOOLTIP_VERTICAL);
  }

  private updateInnerText(): void {
    this.tooltipEl.textContent = String(this.value);
  }

  private render(): void {
    const { tooltipEl } = this;
    tooltipEl.classList.add(CSS_CLASSES.TOOLTIP);
    tooltipEl.textContent = String(this.value);
    if (this.isVertical) {
      this.toggleVerticalClass();
    }

    this.rootElement.append(tooltipEl);
  }
}

export { Tooltip };
