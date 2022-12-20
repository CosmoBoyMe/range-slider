import type { IOptions } from "../types";
import { getClosestValue } from "../helpers";
import { ObserverTypes, DEFAULT_OPTIONS } from "../constants";
import { Observer } from "../Observer/Observer";

class Model extends Observer {
  options: IOptions;

  constructor(options: Partial<IOptions>) {
    super();
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.init();
  }

  public getOptions(): IOptions {
    return JSON.parse(JSON.stringify(this.options));
  }

  public updateValue({ value, index }: { value: number; index: number }): void {
    const newValues = [...this.options.values];
    newValues[index] = value;
    this.setNewOptions({ values: newValues });
    this.notify(ObserverTypes.VALUE_UPDATED, { value, index });
  }

  private setNewOptions(newOptions: Partial<IOptions>): void {
    const oldOptions = JSON.parse(JSON.stringify(this.options));
    this.options = { ...oldOptions, ...newOptions };
  }

  public updateOptions(newOptions: Partial<IOptions>): void {
    this.setNewOptions(newOptions);
    this.normalizeOptions();
    this.notify(ObserverTypes.OPTIONS_CHANGED, this.options);
  }

  private init(): void {
    this.normalizeOptions();
  }

  private normalizeOptions(): void {
    const max = this.normalizeMax();
    const step = this.normalizeStep();
    const scaleCounts = this.normalizeScaleCounts();
    const values = this.normalizeValues();
    const normalizedOptions = {
      max,
      scaleCounts,
      step,
      values,
    };
    this.setNewOptions(normalizedOptions);
  }

  private normalizeScaleCounts(): number {
    const { min, max, step, scaleCounts } = this.options;
    if (scaleCounts <= 0) {
      return 1;
    }
    const range = Math.abs(max - min);
    const maxScaleCounts = range / step + 1;
    const normalizedScaleCounts = Math.round(
      maxScaleCounts < scaleCounts ? maxScaleCounts : scaleCounts
    );
    return normalizedScaleCounts;
  }

  private normalizeMax(): number {
    const { min, max, step } = this.options;
    if (min > max) {
      return min + step;
    }
    if (min === max) {
      return min + step;
    }
    return max;
  }

  private normalizeValues(): number[] {
    const { min, max, step, values } = this.options;
    const normalizedValues = values.map((value) =>
      getClosestValue(min, max, value, step)
    );
    const sortedValues = normalizedValues.sort((a, b) => a - b);
    return sortedValues;
  }

  private normalizeStep(): number {
    const { step, min, max } = this.options;
    const range = Math.abs(max - min);
    if (step <= 0) {
      return 1;
    }
    if (step > range) {
      return range;
    }
    return step;
  }
}

export { Model };
