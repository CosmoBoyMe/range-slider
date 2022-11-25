import "./style.scss";
import type { IOptions, onChangeOptionsFn } from "./types";
import { ObserverTypes, SliderClasses } from "./const";
import { Presenter } from "./Presenter/Presenter";
import { Model } from "./Model/Model";
import { View } from "./View/View";

class Slider {
  private sliderElement = document.createElement("div");

  modelInstance: Model;

  viewInstance: View;

  presenterInstance: Presenter;

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

  public changeOptions(fn: onChangeOptionsFn): void {
    const notifyFn = () => {
      fn(this.getOptions());
    };

    this.modelInstance.subscribe(ObserverTypes.OPTIONS_CHANGED, notifyFn);
    this.modelInstance.subscribe(ObserverTypes.VALUE_UPDATED, notifyFn);
  }

  public getOptions(): IOptions {
    return this.modelInstance.getOptions();
  }
}

export { Slider };
