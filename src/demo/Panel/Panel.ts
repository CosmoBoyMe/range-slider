import './style.scss';

import { Slider } from '../../Slider';

import type { IOptions, Entries } from '../../types';

import { panelClasses } from '../../const';

interface IPanelElements {
  minInput: HTMLInputElement;
  maxInput: HTMLInputElement;
  stepInput: HTMLInputElement;
  scaleCountsInput: HTMLInputElement;
  valuesInputs: NodeListOf<HTMLInputElement>;
  scaleToggleInput: HTMLInputElement;
  tooltipToggleInput: HTMLInputElement;
  progressToggleInput: HTMLInputElement;
  verticalToggleInput: HTMLInputElement;
}

class Panel {
  private slider: Slider;

  private panelEl: HTMLElement;

  private options: IOptions;

  private panelElements!: IPanelElements;

  constructor(panelEl: HTMLElement, slider: Slider) {
    this.panelEl = panelEl;
    this.slider = slider;
    this.options = slider.getOptions();
    this.slider.onChangeOptions(this.onChangeOptions.bind(this));
    this.findElements();
    this.bindListeners();
  }

  private findElements(): void {
    const { panelEl } = this;

    const minField = panelEl.querySelector(
      `.${panelClasses.MIN_FIELD}`
    ) as HTMLElement;
    const minInput = minField.querySelector('input') as HTMLInputElement;

    const maxField = panelEl.querySelector(
      `.${panelClasses.MAX_FIELD}`
    ) as HTMLElement;
    const maxInput = maxField.querySelector('input') as HTMLInputElement;

    const stepField = panelEl.querySelector(
      `.${panelClasses.STEP_FIELD}`
    ) as HTMLElement;
    const stepInput = stepField.querySelector('input') as HTMLInputElement;

    const scaleCountsField = panelEl.querySelector(
      `.${panelClasses.SCALE_COUNTS_FIELD}`
    ) as HTMLElement;
    const scaleCountsInput = scaleCountsField.querySelector(
      'input'
    ) as HTMLInputElement;

    const thumbsValuesField = panelEl.querySelector(
      `.${panelClasses.THUMB_VALUES}`
    ) as HTMLElement;
    const thumbsValuesInputs = thumbsValuesField.querySelectorAll(
      'input'
    ) as NodeListOf<HTMLInputElement>;

    const verticalToggleField = panelEl.querySelector(
      `.${panelClasses.TOGGLE_VERTICAL_FIELD}`
    ) as HTMLElement;
    const verticalToggleInput = verticalToggleField.querySelector(
      'input'
    ) as HTMLInputElement;

    const scaleToggleField = panelEl.querySelector(
      `.${panelClasses.TOGGLE_SCALE_FIELD}`
    ) as HTMLElement;
    const scaleToggleInput = scaleToggleField.querySelector(
      'input'
    ) as HTMLInputElement;

    const tooltipToggleField = panelEl.querySelector(
      `.${panelClasses.TOGGLE_TOOLTIP_FIELD}`
    ) as HTMLElement;
    const tooltipToggleInput = tooltipToggleField.querySelector(
      'input'
    ) as HTMLInputElement;

    const progressToggleField = panelEl.querySelector(
      `.${panelClasses.TOGGLE_PROGRESS_FIELD}`
    ) as HTMLElement;
    const progressToggleInput = progressToggleField.querySelector(
      'input'
    ) as HTMLInputElement;
    this.panelElements = {
      minInput,
      maxInput,
      stepInput,
      scaleCountsInput,
      scaleToggleInput,
      verticalToggleInput,
      tooltipToggleInput,
      progressToggleInput,
      valuesInputs: thumbsValuesInputs,
    };
  }

  private handlerItemInputBlur(event: Event, name: keyof IOptions) {
    const inputEl = event.target as HTMLInputElement;
    const { value } = inputEl;
    this.slider.updateOptions({ [name]: Number(value) });
  }

  private handlerThumbInputBlur(event: Event, index: number) {
    const inputEl = event.target as HTMLInputElement;
    const { value } = inputEl;
    this.options.values[index] = Number(value);
    this.slider.updateOptions({ values: this.options.values });
  }

  private handlerToggleInputClick(
    event: MouseEvent,
    optionName: keyof IOptions
  ): void {
    const { options } = this;
    this.slider.updateOptions({ [optionName]: !options[optionName] });
  }

  private onChangeOptions(newOptions: IOptions): void {
    this.options = newOptions;
    this.updateInputFieldsValues();
  }

  private updateInputFieldsValues(): void {
    const { panelElements } = this;
    const {
      minInput,
      maxInput,
      stepInput,
      scaleCountsInput,
      valuesInputs,
      scaleToggleInput,
      tooltipToggleInput,
      progressToggleInput,
      verticalToggleInput,
    } = panelElements;
    const entriesOptions = Object.entries(this.options) as Entries<IOptions>;
    entriesOptions.forEach(([key, value]) => {
      switch (key) {
        case 'min':
          minInput.value = String(value);
          break;
        case 'max':
          maxInput.value = String(value);
          break;
        case 'step':
          stepInput.value = String(value);
          break;
        case 'scaleCounts':
          scaleCountsInput.value = String(value);
          break;
        case 'vertical':
          verticalToggleInput.checked = value;
          break;
        case 'progress':
          progressToggleInput.checked = value;
          break;
        case 'tooltip':
          tooltipToggleInput.checked = value;
          break;
        case 'scale':
          scaleToggleInput.checked = value;
          break;
        case 'values':
          value.forEach((currentValue, index) => {
            valuesInputs[index].value = String(currentValue);
          });
          break;
        default:
          throw new Error(`unexpected options key: ${key}`);
      }
    });
  }

  private bindListeners(): void {
    const { panelElements } = this;
    const {
      minInput,
      maxInput,
      stepInput,
      scaleCountsInput,
      valuesInputs,
      scaleToggleInput,
      tooltipToggleInput,
      progressToggleInput,
      verticalToggleInput,
    } = panelElements;
    const optionsKeys = Object.keys(this.options);
    optionsKeys.forEach((key) => {
      switch (key) {
        case 'min':
          minInput.addEventListener('blur', (event) =>
            this.handlerItemInputBlur(event, key)
          );
          break;
        case 'max':
          maxInput.addEventListener('blur', (event) =>
            this.handlerItemInputBlur(event, key)
          );
          break;
        case 'step':
          stepInput.addEventListener('blur', (event) =>
            this.handlerItemInputBlur(event, key)
          );
          break;
        case 'scaleCounts':
          scaleCountsInput.addEventListener('blur', (event) =>
            this.handlerItemInputBlur(event, key)
          );
          break;
        case 'vertical':
          verticalToggleInput.addEventListener('click', (event) =>
            this.handlerToggleInputClick(event, key)
          );
          break;
        case 'progress':
          progressToggleInput.addEventListener('click', (event) =>
            this.handlerToggleInputClick(event, key)
          );
          break;
        case 'tooltip':
          tooltipToggleInput.addEventListener('click', (event) =>
            this.handlerToggleInputClick(event, key)
          );
          break;
        case 'scale':
          scaleToggleInput.addEventListener('click', (event) =>
            this.handlerToggleInputClick(event, key)
          );
          break;
        case 'values': {
          const values = this.options[key];
          values.forEach((value, index) => {
            valuesInputs[index].addEventListener('blur', (event) =>
              this.handlerThumbInputBlur(event, index)
            );
          });
          break;
        }
        default:
          throw new Error(`unexpected options key: ${key}`);
      }
    });
  }
}

export { Panel };
