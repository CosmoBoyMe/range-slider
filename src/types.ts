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

interface IScaleArguments {
  rootDom: HTMLElement;
  min: number;
  max: number;
  step: number;
  scaleCounts: number;
  vertical: boolean;
  handleScaleClick: (event: MouseEvent) => void,
}
interface IThumbArguments {
  rootElement: HTMLElement;
  value: number;
  min: number;
  max: number;
  index: number;
  isVertical: boolean;
  enableTooltip: boolean;
  handleThumbMouseDown: (event: MouseEvent, index: number) => void;
}
interface ITrackArguments {
  element : HTMLElement;
  isVertical: boolean;
  handleTrackClick: (event: MouseEvent) => void;
}

interface ITooltipArguments {
  rootElement: HTMLElement,
  value: number,
  isVertical: boolean,
}
interface IViewInstances {
  track: Track | null,
  thumbs: Thumb[],
  progress: Progress | null,
  scale: Scale | null
}
export type {
  IOptions, IPropgessArguments, ITrackArguments, IScaleArguments, ITooltipArguments,
  IThumbArguments, IViewInstances,
};
