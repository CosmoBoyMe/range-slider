import { CSS_CLASSES } from '../../const';
import type { ITrackArguments } from '../../types';

class Track {
  private element: HTMLElement;

  private isVertical: boolean;

  private handleTrackClick: (event: MouseEvent) => void;

  private trackElement: HTMLDivElement = document.createElement('div');

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
    this.trackElement.classList.toggle(CSS_CLASSES.TRACK_VERTICAL);
  }

  public destroy(): void {
    this.trackElement.remove();
  }

  private render(): void {
    const { trackElement, element } = this;

    trackElement.classList.add(CSS_CLASSES.TRACK);
    trackElement.addEventListener('pointerdown', this.handleTrackClick);
    if (this.isVertical) {
      this.toggleVerticalClass();
    }
    element.append(trackElement);
  }
}

export { Track };
