import type { Slider } from "../../../slider/Slider";
import { PanelClasses } from "../../constants";
import type { IOptions, Entries } from "../../types";
import "./panel.scss";

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

  private panelElements: Partial<IPanelElements> = {};

  constructor(panelElement: HTMLElement, slider: Slider) {
    this.panelElement = panelElement;
    this.slider = slider;
    this.options = slider.getOptions();
    this.slider.subscribe(this.onChangeOptions.bind(this));
    this.initElements();
    this.bindListeners();
  }

  private initElements(): void {
    const minField = this.panelElement.querySelector<HTMLDivElement>(
      `.js-${PanelClasses.MIN_FIELD}`
    );
    const minInput = minField?.querySelector<HTMLInputElement>("input");
    if (minInput) {
      this.panelElements.minInput = minInput;
      minInput.value = String(this.options.min);
    }

    const maxField = this.panelElement.querySelector<HTMLDivElement>(
      `.js-${PanelClasses.MAX_FIELD}`
    );
    const maxInput = maxField?.querySelector<HTMLInputElement>("input");
    if (maxInput) {
      this.panelElements.maxInput = maxInput;
      maxInput.value = String(this.options.max);
    }

    const stepField = this.panelElement.querySelector<HTMLDivElement>(
      `.js-${PanelClasses.STEP_FIELD}`
    );
    const stepInput = stepField?.querySelector<HTMLInputElement>("input");
    if (stepInput) {
      this.panelElements.stepInput = stepInput;
      stepInput.value = String(this.options.step);
    }

    const scaleCountsField = this.panelElement.querySelector<HTMLDivElement>(
      `.js-${PanelClasses.SCALE_COUNTS_FIELD}`
    );
    const scaleCountsInput =
      scaleCountsField?.querySelector<HTMLInputElement>("input");
    if (scaleCountsInput) {
      this.panelElements.scaleCountsInput = scaleCountsInput;
      scaleCountsInput.value = String(this.options.scaleCounts);
    }

    this.panelElements.valuesInputs = [];
    this.options.values.forEach((value) => {
      const thumbsField = this.createThumbsField("value", value);
      const thumbsInputs = thumbsField.querySelector<HTMLInputElement>("input");
      const thumbsValuesContainer =
        this.panelElement.querySelector<HTMLDivElement>(
          `.js-${PanelClasses.THUMB_VALUES}`
        );
      thumbsValuesContainer?.append(thumbsField);
      if (thumbsInputs) {
        this.panelElements.valuesInputs?.push(thumbsInputs);
      }
    });

    const verticalToggleField = this.panelElement.querySelector<HTMLDivElement>(
      `.js-${PanelClasses.TOGGLE_VERTICAL_FIELD}`
    );
    const verticalToggleInput =
      verticalToggleField?.querySelector<HTMLInputElement>("input");
    if (verticalToggleInput) {
      this.panelElements.verticalToggleInput = verticalToggleInput;
      verticalToggleInput.checked = Boolean(this.options.isVertical);
    }

    const scaleToggleField = this.panelElement.querySelector<HTMLDivElement>(
      `.js-${PanelClasses.TOGGLE_SCALE_FIELD}`
    );
    const scaleToggleInput =
      scaleToggleField?.querySelector<HTMLInputElement>("input");
    if (scaleToggleInput) {
      this.panelElements.scaleToggleInput = scaleToggleInput;
      scaleToggleInput.checked = Boolean(this.options.withScale);
    }

    const tooltipToggleField = this.panelElement.querySelector<HTMLDivElement>(
      `.js-${PanelClasses.TOGGLE_TOOLTIP_FIELD}`
    );
    const tooltipToggleInput =
      tooltipToggleField?.querySelector<HTMLInputElement>("input");
    if (tooltipToggleInput) {
      this.panelElements.tooltipToggleInput = tooltipToggleInput;
      tooltipToggleInput.checked = Boolean(this.options.withTooltip);
    }

    const progressToggleField = this.panelElement.querySelector<HTMLDivElement>(
      `.js-${PanelClasses.TOGGLE_PROGRESS_FIELD}`
    );
    const progressToggleInput =
      progressToggleField?.querySelector<HTMLInputElement>("input");
    if (progressToggleInput) {
      this.panelElements.progressToggleInput = progressToggleInput;
      progressToggleInput.checked = Boolean(this.options.withProgress);
    }

    const newThumbInputField = this.panelElement.querySelector<HTMLDivElement>(
      `.js-${PanelClasses.NEW_THUMB_FIELD}`
    );
    const newThumbInput =
      newThumbInputField?.querySelector<HTMLInputElement>("input");
    if (newThumbInput) {
      this.panelElements.newThumbInput = newThumbInput;
    }

    const newThumbButtonField = this.panelElement.querySelector<HTMLDivElement>(
      `.js-${PanelClasses.NEW_THUMB_BUTTON_FIELD}`
    );
    const newThumbButton =
      newThumbButtonField?.querySelector<HTMLButtonElement>("button");
    if (newThumbButton) {
      this.panelElements.newThumbButton = newThumbButton;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private createThumbsField(text: string, value: number): HTMLLabelElement {
    const labelEl = document.createElement("label");
    const textEl = document.createElement("span");
    const inputEl = document.createElement("input");
    labelEl.classList.add(PanelClasses.THUMB_FIELD);
    textEl.classList.add(PanelClasses.THUMB_FIELD_TEXT);
    inputEl.classList.add(PanelClasses.THUMB_FIELD_INPUT);
    textEl.textContent = text;
    inputEl.setAttribute("value", String(value));
    inputEl.setAttribute("type", "number");
    labelEl.append(textEl, inputEl);
    return labelEl;
  }

  private handleItemInputChange({ target }: Event, name: keyof IOptions) {
    if (target instanceof HTMLInputElement) {
      this.slider.updateOptions({ [name]: Number(target.value) });
    }
  }

  private handleThumbInputChange({ target }: Event, index: number) {
    if (target instanceof HTMLInputElement) {
      this.options.values[index] = Number(target.value);
      this.slider.updateOptions({ values: this.options.values });
    }
  }

  private handleToggleInputClick(
    event: MouseEvent,
    optionName: keyof IOptions
  ): void {
    this.slider.updateOptions({ [optionName]: !this.options[optionName] });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleCreateNewThumbButtonClick(event: Event): void {
    if (this.panelElements.newThumbInput) {
      this.options.values.push(Number(this.panelElements.newThumbInput.value));
      const thumbField = this.createThumbsField(
        "value",
        Number(this.panelElements.newThumbInput.value)
      );
      const thumbInput = thumbField.querySelector<HTMLInputElement>(
        "input"
      ) as HTMLInputElement;
      const thumbsValuesContainer =
        this.panelElement.querySelector<HTMLDivElement>(
          `.js-${PanelClasses.THUMB_VALUES}`
        );
      thumbsValuesContainer?.append(thumbField);
      this.panelElements.valuesInputs?.push(thumbInput);
      this.slider.updateOptions({ values: this.options.values });
      this.panelElements.newThumbInput.value = "0";
      thumbInput.addEventListener("change", (thumbEvent) =>
        this.handleThumbInputChange(thumbEvent, this.options.values.length - 1)
      );
    }
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
          if (minInput) minInput.value = String(value);
          break;
        case "max":
          if (maxInput) maxInput.value = String(value);
          break;
        case "step":
          if (stepInput) stepInput.value = String(value);
          break;
        case "scaleCounts":
          if (scaleCountsInput) scaleCountsInput.value = String(value);
          break;
        case "isVertical":
          if (verticalToggleInput) verticalToggleInput.checked = value;
          break;
        case "withProgress":
          if (progressToggleInput) progressToggleInput.checked = value;
          break;
        case "withTooltip":
          if (tooltipToggleInput) tooltipToggleInput.checked = value;
          break;
        case "withScale":
          if (scaleToggleInput) scaleToggleInput.checked = value;
          break;
        case "values":
          value.forEach((currentValue, index) => {
            if (valuesInputs) {
              valuesInputs[index].value = String(currentValue);
            }
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
          minInput?.addEventListener("change", (event) =>
            this.handleItemInputChange(event, key)
          );
          break;
        case "max":
          maxInput?.addEventListener("change", (event) =>
            this.handleItemInputChange(event, key)
          );
          break;
        case "step":
          stepInput?.addEventListener("change", (event) =>
            this.handleItemInputChange(event, key)
          );
          break;
        case "scaleCounts":
          scaleCountsInput?.addEventListener("change", (event) =>
            this.handleItemInputChange(event, key)
          );

          break;
        case "isVertical":
          verticalToggleInput?.addEventListener("click", (event) =>
            this.handleToggleInputClick(event, key)
          );
          break;
        case "withProgress":
          progressToggleInput?.addEventListener("click", (event) =>
            this.handleToggleInputClick(event, key)
          );
          break;
        case "withTooltip":
          tooltipToggleInput?.addEventListener("click", (event) =>
            this.handleToggleInputClick(event, key)
          );
          break;
        case "withScale":
          scaleToggleInput?.addEventListener("click", (event) =>
            this.handleToggleInputClick(event, key)
          );
          break;
        case "values": {
          const values = this.options[key];
          values.forEach((_, index) => {
            if (valuesInputs) {
              valuesInputs[index].addEventListener("change", (event) =>
                this.handleThumbInputChange(event, index)
              );
            }
          });
          break;
        }
        default:
          throw new Error(`unexpected options key: ${key}`);
      }
    });
    newThumbButton?.addEventListener("click", (event) => {
      this.handleCreateNewThumbButtonClick(event);
    });
  }
}

export { Panel };
