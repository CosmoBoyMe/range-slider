import type { Model } from '../Model/Model';
import type { View } from '../View/View';
import { ObserverTypes } from '../const';

import type { IOptions, valuePayload } from '../types';

class Presenter {
  private modelInstance: Model;

  private viewInstance: View;

  constructor(modelInstance: Model, viewInstance: View) {
    this.modelInstance = modelInstance;
    this.viewInstance = viewInstance;
    this.bind();
  }

  public getModelInstance() {
    return this.modelInstance;
  }

  public getViewInstance() {
    return this.viewInstance;
  }

  private bind() {
    this.modelInstance.subscribe(ObserverTypes.OPTIONS_CHANGED, (data: IOptions) => {
      this.viewInstance.updateOptions(data);
    });
    this.viewInstance.subscribe(ObserverTypes.UPDATE_VALUE, (payload: valuePayload) => {
      this.modelInstance.updateValue(payload);
    });

    this.modelInstance.subscribe(ObserverTypes.VALUE_UPDATED, (payload: valuePayload) => {
      this.viewInstance.updateValue(payload);
    });
  }
}

export { Presenter };
