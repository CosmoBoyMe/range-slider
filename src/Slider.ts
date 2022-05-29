import './style.scss';

import { Presenter } from './Presenter/Presenter';
import { Model } from './Model/Model';
import { View } from './View/View';

import { ObserverTypes } from './const';

import type { IOptions, onChangeOptionsFn } from './types';

class Slider {
  modelInstance: Model;

  viewInstance: View;

  presenterInstance: Presenter;

  constructor(domRoot: HTMLElement, options: Partial<IOptions> = {}) {
    this.modelInstance = new Model(options);
    const modelOptions = this.modelInstance.getOptions();
    this.viewInstance = new View(domRoot, modelOptions);
    this.presenterInstance = new Presenter(
      this.modelInstance,
      this.viewInstance
    );
  }

  public updateOptions(newOptions: Partial<IOptions>): void {
    this.modelInstance.updateOptions(newOptions);
  }

  public onChangeOptions(fn: onChangeOptionsFn): void {
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
