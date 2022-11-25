import { SliderClasses } from "../../const";
import type { ITrackArguments } from "../../types";

class Track {
  private rootElement: HTMLElement;

  private isVertical: boolean;

  private handleTrackClick: (event: MouseEvent) => void;

  private trackElement: HTMLDivElement = document.createElement("div");

  constructor({ rootElement, isVertical, handleTrackClick }: ITrackArguments) {
    this.rootElement = rootElement;
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
    this.trackElement.addEventListener("pointerdown", this.handleTrackClick);
    if (this.isVertical) {
      this.toggleVerticalClass();
    }
    this.rootElement.append(this.trackElement);
  }
}

export { Track };
