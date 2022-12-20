import type { Progress, Scale, Thumb, Track } from "./View/subView";

interface IOptions {
  min: number;
  max: number;
  step: number;
  scaleCounts: number;
  isVertical: boolean;
  withScale: boolean;
  withTooltip: boolean;
  withProgress: boolean;
  values: number[];
}

interface IProgressArguments {
  rootElement: HTMLElement;
  values: number[];
  min: number;
  max: number;
  withRange: boolean;
  isVertical: boolean;
}

interface IScaleArguments {
  rootElement: HTMLElement;
  min: number;
  max: number;
  step: number;
  scaleCounts: number;
  isVertical: boolean;
  handleScaleClick: (event: MouseEvent) => void;
}

interface IThumbArguments {
  rootElement: HTMLElement;
  value: number;
  min: number;
  max: number;
  index: number;
  isVertical: boolean;
  withTooltip: boolean;
  handleThumbPointerDown: (event: MouseEvent, index: number) => void;
}

interface ITrackArguments {
  rootElement: HTMLElement;
  isVertical: boolean;
  handleTrackClick: (event: MouseEvent) => void;
}

interface ITooltipArguments {
  rootElement: HTMLElement;
  value: number;
  isVertical: boolean;
}

interface IViewInstances {
  track: Track | null;
  thumbs: Thumb[];
  progress: Progress | null;
  scale: Scale | null;
}

type valuePayload = { value: number; index: number };

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type observerFn<T> = (data: T) => void;
type observers = Record<string, observerFn<any>[]>;
type onChangeOptionsFn = (data: IOptions) => unknown;

export type {
  IOptions,
  IProgressArguments,
  ITrackArguments,
  IScaleArguments,
  ITooltipArguments,
  IThumbArguments,
  IViewInstances,
  valuePayload,
  Entries,
  observerFn,
  observers,
  onChangeOptionsFn,
};
