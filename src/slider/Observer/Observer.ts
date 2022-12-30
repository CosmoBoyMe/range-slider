import { ObserverTypes } from "../constants";
import type { ObserverFn, Observers } from "../types";

class Observer {
  observers: Observers = {};

  public getObservers(): Observers {
    return this.observers;
  }

  public unsubscribe<T>(type: ObserverTypes, observer: ObserverFn<T>): void {
    this.observers[type] = this.observers[type].filter((fn) => fn !== observer);
  }

  public subscribe<T>(type: ObserverTypes, observer: ObserverFn<T>): void {
    if (!this.observers[type]) {
      this.observers[type] = [observer];
    } else {
      this.observers[type].push(observer);
    }
  }

  public notify<T>(type: ObserverTypes, data: T): boolean {
    if (this.observers[type]) {
      this.observers[type].forEach((observer) => observer(data));
      return true;
    }
    return false;
  }
}

export { Observer };
