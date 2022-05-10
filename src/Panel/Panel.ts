import './style.scss';

import { Slider } from '../Slider';

import type { IOptions, Entries, IValuesInput } from '../types';

import { panelClasses } from '../const';

class Panel {
  private slider: Slider;

  private rootElement: HTMLElement;

  private panelEl: HTMLDivElement = document.createElement('div');

  private options: IOptions;

  constructor(rootElement: HTMLElement, slider: Slider) {
    this.rootElement = rootElement;
    this.panelEl.classList.add(panelClasses.PANEL);
    this.rootElement.append(this.panelEl);
    this.slider = slider;
    this.options = slider.getOptions();
    this.slider.onChangeOptions(this.onChangeOptions.bind(this));
    this.render();
  }

  private handlerDeleteThumbBtnClick(event: MouseEvent, index: number) {
    const { values } = this.options;
    const newValues = values.filter((_, itemIndex) => index !== itemIndex);
    this.options.values = newValues;
    this.slider.updateOptions(this.options);
  }

  private handlerItemInputBlur(event: Event, name: keyof IOptions, index?: number) {
    const inputEl = event.target as HTMLInputElement;
    const { value } = inputEl;
    const isValuesInput = name === 'values' && index !== undefined;

    if (isValuesInput) {
      this.options.values[index] = Number(value);
      this.slider.updateOptions({ [name]: this.options.values });
    } else {
      this.slider.updateOptions({ [name]: Number(value) });
    }
  }

  private handlerItemCheckboxClick(event: MouseEvent, optionName: keyof IOptions) {
    const { options } = this;
    if (typeof options[optionName] === 'boolean') {
      Object.defineProperty(options, optionName, {
        value: !options[optionName],
      });
      this.slider.updateOptions(options);
    }
  }

  private handleAddNewThumbBtnClick(_:MouseEvent, value:number) {
    const { values } = this.options;
    values.push(value);
    this.slider.updateOptions({ values });
  }

  private createValuesInput({
    name, text, value, index,
  }: IValuesInput) {
    const labelEl = document.createElement('label');
    labelEl.classList.add(panelClasses.PANEL_ITEM);

    const inputEl = document.createElement('input');
    inputEl.classList.add(panelClasses.PANEL_ITEM_INPUT);
    inputEl.setAttribute('type', 'number');
    inputEl.setAttribute('data-values', String(value));
    inputEl.value = String(value);
    inputEl.addEventListener('blur', (event) => this.handlerItemInputBlur(event, name, index));

    const button = document.createElement('button');
    button.classList.add(panelClasses.PANEL_DELETE_THUMB_BTN);
    button.textContent = 'delete thumb';
    button.addEventListener('click', (event) => this.handlerDeleteThumbBtnClick(event, index));

    labelEl.append(text, inputEl, button);
    return labelEl;
  }

  private createSwitchElement(optionName: keyof IOptions, text: string, checked: boolean) {
    const labelEl = document.createElement('label');
    labelEl.classList.add(panelClasses.PANEL_ITEM);

    const checkboxEl = document.createElement('input');
    checkboxEl.classList.add(panelClasses.PANEL_ITEM_CHECKBOX);
    checkboxEl.setAttribute('type', 'checkbox');
    checkboxEl.checked = checked;
    checkboxEl.setAttribute(`data-${optionName}`, String(checked));
    checkboxEl.addEventListener('click', (event) => this.handlerItemCheckboxClick(event, optionName));

    labelEl.append(text, checkboxEl);
    return labelEl;
  }

  private createNumberInputEl(name: keyof IOptions, text: string, value: number) {
    const labelEl = document.createElement('label');
    labelEl.classList.add(panelClasses.PANEL_ITEM);

    const inputEl = document.createElement('input');
    inputEl.classList.add(panelClasses.PANEL_ITEM_INPUT);
    inputEl.setAttribute('type', 'number');
    inputEl.setAttribute(`data-${name}`, String(value));
    inputEl.value = String(value);
    inputEl.addEventListener('blur', (event) => this.handlerItemInputBlur(event, name));

    labelEl.append(text, inputEl);
    return labelEl;
  }

  private createNewThumbBlock() {
    const newThumbBlock = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.innerText = 'add new Value';

    const inputEl = document.createElement('input');
    inputEl.classList.add(panelClasses.PANEL_NEW_ITEM_INPUT);
    inputEl.setAttribute('type', 'number');

    const button = document.createElement('button');
    button.classList.add(panelClasses.PANEL_ADD_NEW_THUMB_BTN);
    button.innerText = '+';
    button.addEventListener('click', (event) => {
      const value = Number(inputEl.value);
      this.handleAddNewThumbBtnClick(event, value);
    });

    inputEl.setAttribute('type', 'number');
    newThumbBlock.append(h3, inputEl, button);
    return newThumbBlock;
  }

  private onChangeOptions(newOptions: IOptions) {
    this.options = newOptions;
    this.render();
  }

  private render() {
    const entriesOptions = Object.entries(this.options) as Entries<IOptions>;
    const controlsElemenets: HTMLElement[] = [];

    const switchContainer = document.createElement('div');
    switchContainer.classList.add(panelClasses.PANEL_SWITCH_CONTAINER);

    entriesOptions.forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        const switchElement = this.createSwitchElement(key, key, value);
        switchContainer.append(switchElement);
      } else if (key === 'values') {
        const valueElements = value.map((val: number, index) => this.createValuesInput({
          name: key, text: 'value', value: val, index,
        }));
        const newThumbsBlock = this.createNewThumbBlock();
        controlsElemenets.push(...valueElements, newThumbsBlock);
      } else {
        controlsElemenets.push(this.createNumberInputEl(key, key, value));
      }
    });

    this.panelEl.innerHTML = '';
    this.panelEl.append(...controlsElemenets, switchContainer);
  }
}

export { Panel };
