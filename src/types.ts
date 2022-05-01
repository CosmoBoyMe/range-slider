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

type valuePayload = { value: number, index: number }

export type { IOptions, valuePayload };
