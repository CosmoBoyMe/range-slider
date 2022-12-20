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

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export { IOptions, Entries };
