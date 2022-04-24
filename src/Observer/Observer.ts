import { ObserverTypes } from '../const';

type observerFn <T>= (data: T) => void;

class Observer {
  observers:Record<string, observerFn<any>[]> = {};

  public getObservers() {
    return this.observers;
  }

  subscribe<T>(type:ObserverTypes, observer:observerFn<T>):void {
    if (!this.observers[type]) {
      this.observers[type] = [observer];
    } else {
      this.observers[type].push(observer);
    }
  }

  notify<T>(type:ObserverTypes, data: T): boolean {
    if (this.observers[type]) {
      this.observers[type].forEach((observer) => observer(data));
      return true;
    }
    return false;
  }
}

export { Observer };
