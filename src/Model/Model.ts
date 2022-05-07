import { getClosestValue } from '../helpers';
import { Observer } from '../Observer/Observer';
import { ObserverTypes, DEFAULT_OPTIONS } from '../const';
import type { IOptions } from '../types';

class Model extends Observer {
  options: IOptions;

  constructor(options: Partial<IOptions>) {
    super();
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.init();
  }

  public getOptions(): IOptions {
    const { options } = this;
    return JSON.parse(JSON.stringify(options));
  }

  public updateValue({ value, index }: {value: number, index: number}) {
    this.options.values[index] = value;
    const newValue = this.options.values[index];
    this.notify(ObserverTypes.VALUE_UPDATED, { value: newValue, index });
  }

  public updateOptions(newOptions: Partial<IOptions>) {
    this.options = { ...this.options, ...newOptions };
    this.normalizeOptions();
    this.notify(ObserverTypes.OPTIONS_CHANGED, this.options);
  }

  private init() {
    this.normalizeOptions();
  }

  private normalizeOptions() {
    this.normalizeMax();
    this.normalizeScaleCounts();
    this.normalizeStep();
    this.normalizeValues();
  }

  private normalizeScaleCounts() {
    const {
      min, max, step, scaleCounts,
    } = this.options;
    const range = Math.abs(max - min);
    const maxScaleCounts = range / step + 1;
    const normalizedScaleCounts = Math.round(
      maxScaleCounts < scaleCounts ? maxScaleCounts : scaleCounts,
    );
    this.options.scaleCounts = normalizedScaleCounts;
  }

  private normalizeMax() {
    const { min, max, step } = this.options;
    if (min > max) {
      this.options.max = min + step;
    } if (min === max) {
      this.options.max = min + step;
    }
  }

  private normalizeValues() {
    const {
      min, max, step, values,
    } = this.options;
    const normalizedValues = values.map((value) => getClosestValue(min, max, value, step));

    this.options.values = normalizedValues;
  }

  private normalizeStep() {
    const { step, min, max } = this.options;
    const range = Math.abs(max - min);
    if (step === 0) {
      this.options.step = 1;
    } else if (step > range) {
      this.options.step = range;
    }
  }
}

export { Model };
