import { SliderClasses } from "../../const";
import type { ITrackArguments } from "../../types";

class Track {
  private element: HTMLElement;

  private isVertical: boolean;

  private handleTrackClick: (event: MouseEvent) => void;

  private trackElement: HTMLDivElement = document.createElement("div");

  constructor({ element, isVertical, handleTrackClick }: ITrackArguments) {
    this.element = element;
    this.handleTrackClick = handleTrackClick;
    this.isVertical = isVertical;
    this.render();
  }

  public getElement(): HTMLDivElement {
    return this.trackElement;
  }

  public toggleVerticalClass(): void {
    this.trackElement.classList.toggle(SliderClasses.TRACK_VERTICAL);
  }

  public destroy(): void {
    this.trackElement.remove();
  }

  private render(): void {
    this.trackElement.classList.add(SliderClasses.TRACK);
    if (this.isVertical) {
      this.toggleVerticalClass();
    }
    element.append(trackElement);
  }
}

export { Track };
