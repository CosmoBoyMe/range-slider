import { Presenter } from "./Presenter/Presenter";
import { Model } from "./Model/Model";
import { View } from "./View/View";
import type { IOptions } from "./types/IOptions";
import { ObserverTypes, SliderClasses } from "./constants";
import "./style.scss";

type OnChangeOptionsFn = (data: IOptions) => void;

class Slider {
  private sliderElement = document.createElement("div");

  private modelInstance: Model;

  private viewInstance: View;

  private presenterInstance: Presenter;

  private notifyFn: null | (() => void) = null;

  constructor(rootElement: HTMLElement, options: Partial<IOptions> = {}) {
    this.sliderElement.classList.add(SliderClasses.SLIDER);
    rootElement.append(this.sliderElement);
    this.modelInstance = new Model(options);
    const modelOptions = this.modelInstance.getOptions();
    this.viewInstance = new View(this.sliderElement, modelOptions);
    this.presenterInstance = new Presenter(
      this.modelInstance,
      this.viewInstance
    );
  }

  public updateOptions(newOptions: Partial<IOptions>): void {
    this.modelInstance.updateOptions(newOptions);
  }

  public subscribe(fn: OnChangeOptionsFn): void {
    const notifyFn = () => {
      fn(this.getOptions());
    };

    this.notifyFn = notifyFn;

    this.modelInstance.subscribe(ObserverTypes.OPTIONS_CHANGED, notifyFn);
    this.modelInstance.subscribe(ObserverTypes.VALUE_UPDATED, notifyFn);
  }

  public unsubscribe(): void {
    if (this.notifyFn !== null) {
      this.modelInstance.unsubscribe(
        ObserverTypes.OPTIONS_CHANGED,
        this.notifyFn
      );
      this.modelInstance.unsubscribe(
        ObserverTypes.VALUE_UPDATED,
        this.notifyFn
      );
    }
  }

  public getOptions(): IOptions {
    return this.modelInstance.getOptions();
  }
}

export { Slider, IOptions };
