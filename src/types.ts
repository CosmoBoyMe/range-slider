interface IOptions {
    min: number;
    max: number;
    step: number;
    scaleCounts: number;
    vertical: boolean;
    scale: boolean;
    tooltip: boolean;
    progress: boolean;
    values: number[];
}

interface IPropgessArguments {
  rootElement: HTMLElement,
  values: number[],
  min: number,
  max: number,
  range:boolean,
  vertical: boolean
}

interface ITrackArguments {
  element : HTMLElement;
  isVertical: boolean;
  handleTrackClick: (event: MouseEvent) => void;
}

export type {
  IOptions, IPropgessArguments, ITrackArguments,
};
