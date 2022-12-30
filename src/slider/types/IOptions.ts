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

export type { IOptions };
