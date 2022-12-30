import type { Model } from "../Model/Model";
import type { View } from "../View/View";
import type { IOptions } from "../types/IOptions";
import { ObserverTypes } from "../constants";

interface IValuePayload {
  value: number;
  index: number;
}

class Presenter {
  private modelInstance: Model;

  private viewInstance: View;

  constructor(modelInstance: Model, viewInstance: View) {
    this.modelInstance = modelInstance;
    this.viewInstance = viewInstance;
    this.bind();
  }

  public getModelInstance(): Model {
    return this.modelInstance;
  }

  public getViewInstance(): View {
    return this.viewInstance;
  }

  private bind(): void {
    this.modelInstance.subscribe(
      ObserverTypes.OPTIONS_CHANGED,
      (data: IOptions) => {
        this.viewInstance.updateOptions(data);
      }
    );
    this.viewInstance.subscribe(
      ObserverTypes.UPDATE_VALUE,
      (payload: IValuePayload) => {
        this.modelInstance.updateValue(payload);
      }
    );

    this.modelInstance.subscribe(
      ObserverTypes.VALUE_UPDATED,
      (payload: IValuePayload) => {
        this.viewInstance.updateValue(payload);
      }
    );
  }
}

export { Presenter };
