import type { IOptions, Entries } from "../../types";
import { PanelClasses } from "../../const";
import { Slider } from "../../Slider";
import "./style.scss";

interface IPanelElements {
  minInput: HTMLInputElement;
  maxInput: HTMLInputElement;
  stepInput: HTMLInputElement;
  scaleCountsInput: HTMLInputElement;
  valuesInputs: HTMLInputElement[];
  scaleToggleInput: HTMLInputElement;
  tooltipToggleInput: HTMLInputElement;
  progressToggleInput: HTMLInputElement;
  verticalToggleInput: HTMLInputElement;
  newThumbInput: HTMLInputElement;
  newThumbButton: HTMLButtonElement;
}

class Panel {
  private slider: Slider;

  private panelElement: HTMLElement;

  private options: IOptions;

  private panelElements!: IPanelElements;

  constructor(panelElement: HTMLElement, slider: Slider) {
    this.panelElement = panelElement;
    this.slider = slider;
    this.options = slider.getOptions();
    this.slider.changeOptions(this.onChangeOptions.bind(this));
    this.initEl();
    this.bindListeners();
  }

    const minField = this.panelElement.querySelector(
      `.js-${PanelClasses.MIN_FIELD}`
    ) as HTMLElement;
    const minInput = minField.querySelector("input") as HTMLInputElement;

    const maxField = this.panelElement.querySelector(
      `.js-${PanelClasses.MAX_FIELD}`
    ) as HTMLElement;
    const maxInput = maxField.querySelector("input") as HTMLInputElement;

    const stepField = this.panelElement.querySelector(
      `.js-${PanelClasses.STEP_FIELD}`
    ) as HTMLElement;
    const stepInput = stepField.querySelector("input") as HTMLInputElement;

    const scaleCountsField = this.panelElement.querySelector(
      `.js-${PanelClasses.SCALE_COUNTS_FIELD}`
    ) as HTMLElement;
    const scaleCountsInput = scaleCountsField.querySelector(
      "input"
    ) as HTMLInputElement;

    const thumbsValuesInputs = this.options.values.map((value) => {
      const thumbsField = this.createThumbsField("value", value);
      const thumbsInputs = thumbsField.querySelector("input");
      const thumbsValuesContainer = this.panelElement.querySelector(
        `.js-${PanelClasses.THUMB_VALUES}`
      );
      thumbsValuesContainer?.append(thumbsField);
      return thumbsInputs as HTMLInputElement;
    });

    const verticalToggleField = this.panelElement.querySelector(
      `.js-${PanelClasses.TOGGLE_VERTICAL_FIELD}`
    ) as HTMLElement;
    const verticalToggleInput = verticalToggleField.querySelector(
      "input"
    ) as HTMLInputElement;

    const scaleToggleField = this.panelElement.querySelector(
      `.js-${PanelClasses.TOGGLE_SCALE_FIELD}`
    ) as HTMLElement;
    const scaleToggleInput = scaleToggleField.querySelector(
      "input"
    ) as HTMLInputElement;

    const tooltipToggleField = this.panelElement.querySelector(
      `.js-${PanelClasses.TOGGLE_TOOLTIP_FIELD}`
    ) as HTMLElement;
    const tooltipToggleInput = tooltipToggleField.querySelector(
      "input"
    ) as HTMLInputElement;

    const progressToggleField = this.panelElement.querySelector(
      `.js-${PanelClasses.TOGGLE_PROGRESS_FIELD}`
    ) as HTMLElement;
    const progressToggleInput = progressToggleField.querySelector(
      "input"
    ) as HTMLInputElement;

    const newThumbInputField = this.panelElement.querySelector(
      `.js-${PanelClasses.NEW_THUMB_FIELD}`
    ) as HTMLElement;
    const newThumbInput = newThumbInputField.querySelector(
      "input"
    ) as HTMLInputElement;

    const newThumbButtonField = this.panelElement.querySelector(
      `.js-${PanelClasses.NEW_THUMB_BUTTON_FIELD}`
    ) as HTMLElement;
    const newThumbButton = newThumbButtonField.querySelector(
      "button"
    ) as HTMLButtonElement;

    this.panelElements = {
      minInput,
      maxInput,
      stepInput,
      scaleCountsInput,
      scaleToggleInput,
      verticalToggleInput,
      tooltipToggleInput,
      progressToggleInput,
      newThumbInput,
      newThumbButton,
      valuesInputs: thumbsValuesInputs,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  private createThumbsField(text: string, value: number): HTMLElement {
    const labelEl = document.createElement("label");
    const textEl = document.createElement("span");
    const inputEl = document.createElement("input");
    labelEl.classList.add("input-field__label");
    textEl.classList.add("input-field__text");
    inputEl.classList.add("input-field__input");
    textEl.textContent = text;
    inputEl.setAttribute("value", String(value));
    inputEl.setAttribute("type", "number");
    labelEl.append(textEl, inputEl);
    return labelEl;
  }

    const inputElement = event.target as HTMLInputElement;
    this.slider.updateOptions({ [name]: Number(inputElement.value) });
  }

    const inputElement = event.target as HTMLInputElement;
    this.options.values[index] = Number(inputElement.value);
    this.slider.updateOptions({ values: this.options.values });
  }

  private handlerToggleInputClick(
    event: MouseEvent,
    optionName: keyof IOptions
  ): void {
    this.slider.updateOptions({ [optionName]: !this.options[optionName] });
  }

    this.options.values.push(Number(this.panelElements.newThumbInput.value));
    const thumbField = this.createThumbsField(
      "value",
      Number(this.panelElements.newThumbInput.value)
    );
    const thumbInputs = thumbField.querySelector("input") as HTMLInputElement;
    const thumbsValuesContainer = this.panelElement.querySelector(
      `.js-${PanelClasses.THUMB_VALUES}`
    );
    thumbsValuesContainer?.append(thumbField);
    this.panelElements.valuesInputs.push(thumbInputs);
    this.slider.updateOptions({ values: this.options.values });
  }

  private onChangeOptions(newOptions: IOptions): void {
    this.options = newOptions;
    this.updateInputFieldsValues();
  }

  private updateInputFieldsValues(): void {
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
    } = this.panelElements;
    const entriesOptions = Object.entries(this.options) as Entries<IOptions>;
    entriesOptions.forEach(([key, value]) => {
      switch (key) {
        case "min":
          minInput.value = String(value);
          break;
        case "max":
          maxInput.value = String(value);
          break;
        case "step":
          stepInput.value = String(value);
          break;
        case "scaleCounts":
          scaleCountsInput.value = String(value);
          break;
        case "isVertical":
          verticalToggleInput.checked = value;
          break;
        case "withProgress":
          progressToggleInput.checked = value;
          break;
        case "withTooltip":
          tooltipToggleInput.checked = value;
          break;
        case "withScale":
          scaleToggleInput.checked = value;
          break;
        case "values":
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
      newThumbButton,
    } = this.panelElements;
    const optionsKeys = Object.keys(this.options);
    optionsKeys.forEach((key) => {
      switch (key) {
        case "min":
          minInput.addEventListener("change", (event) =>
            this.handlerItemInputChange(event, key)
          );
          break;
        case "max":
          maxInput.addEventListener("change", (event) =>
            this.handlerItemInputChange(event, key)
          );
          break;
        case "step":
          stepInput.addEventListener("change", (event) =>
            this.handlerItemInputChange(event, key)
          );
          break;
        case "scaleCounts":
          scaleCountsInput.addEventListener("change", (event) =>
            this.handlerItemInputChange(event, key)
          );
          break;
        case "isVertical":
          verticalToggleInput.addEventListener("click", (event) =>
            this.handlerToggleInputClick(event, key)
          );
          break;
        case "withProgress":
          progressToggleInput.addEventListener("click", (event) =>
            this.handlerToggleInputClick(event, key)
          );
          break;
        case "withTooltip":
          tooltipToggleInput.addEventListener("click", (event) =>
            this.handlerToggleInputClick(event, key)
          );
          break;
        case "withScale":
          scaleToggleInput.addEventListener("click", (event) =>
            this.handlerToggleInputClick(event, key)
          );
          break;
        case "values": {
          const values = this.options[key];
          values.forEach((value, index) => {
            valuesInputs[index].addEventListener("change", (event) =>
              this.handlerThumbInputChange(event, index)
            );
          });
          break;
        }
        default:
          throw new Error(`unexpected options key: ${key}`);
      }
    });
    newThumbButton.addEventListener("click", (event) => {
      this.handlerCreateNewThumbButtonClick(event);
    });
  }
}

export { Panel };
