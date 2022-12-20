/* eslint-disable @typescript-eslint/no-empty-function */
import { Observer } from "../Observer/Observer.ts";

describe("Observer class", () => {
  let observer;
  const firstSubscriberType = "test";
  const secondSubscriberType = "test2";
  beforeEach(() => {
    observer = new Observer();
  });

  test("should get observers", () => {
    const firstSubscriberFn = () => {};
    const secondSubscriberFn = () => {};
    observer.subscribe(firstSubscriberType, firstSubscriberFn);
    observer.subscribe(secondSubscriberType, secondSubscriberFn);
    const expected = {
      [firstSubscriberType]: [firstSubscriberFn],
      [secondSubscriberType]: [secondSubscriberFn],
    };

    expect(observer.getObservers()).toEqual(expected);
  });

  test("subscribers with the same type must be in the same array", () => {
    const firstSubscriberFn = () => {};
    const secondSubscriberFn = () => {};
    observer.subscribe(firstSubscriberType, firstSubscriberFn);
    observer.subscribe(firstSubscriberType, secondSubscriberFn);
    const expected = {
      [firstSubscriberType]: [firstSubscriberFn, secondSubscriberFn],
    };
    expect(observer.getObservers()).toEqual(expected);
  });

  test("observer must notify subscribers", () => {
    const mockSubscriberFn = jest.fn();
    observer.subscribe(firstSubscriberType, mockSubscriberFn);
    observer.notify(firstSubscriberType, {});
    expect(mockSubscriberFn.mock.calls.length).toBe(1);
    observer.notify(firstSubscriberType, {});
    observer.notify(firstSubscriberType, {});
    expect(mockSubscriberFn.mock.calls.length).toBe(3);
  });

  test("the observer must pass the correct arguments to the subscriber", () => {
    const mockSubscriberFn = jest.fn((data) => {});
    const mockData = { number: 1, boolean: true };
    observer.subscribe(firstSubscriberType, mockSubscriberFn);
    observer.notify(firstSubscriberType, mockData);
    expect(mockSubscriberFn.mock.calls[0][0]).toEqual(mockData);
  });

  test("observer should unsubscribe", () => {
    const mockSubscriberFn = jest.fn();
    observer.subscribe(firstSubscriberType, mockSubscriberFn);
    observer.notify(firstSubscriberType, {});
    expect(mockSubscriberFn.mock.calls.length).toBe(1);
    observer.unsubscribe(firstSubscriberType, mockSubscriberFn);
    observer.notify(firstSubscriberType, {});
    observer.notify(firstSubscriberType, {});
    expect(mockSubscriberFn.mock.calls.length).toBe(1);
  });
});
