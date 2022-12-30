import "../slider";
import type { IOptions } from "../slider/types";
import type { Slider } from "../slider/Slider";
import { Panel } from "./components/panel/Panel";
import "./components/button/button.scss";
import "./components/input-field/input-field.scss";
import "./components/toggle-field/toggle-field.scss";
import "./style.scss";

const demoElements = document.querySelectorAll(
  ".js-demo"
) as NodeListOf<HTMLElement>;

const customOptionsFirst: Partial<IOptions> = {
  withTooltip: false,
  withProgress: false,
  withScale: false,
  isVertical: false,
};

const customOptionsSecond: Partial<IOptions> = {
  min: -100,
  max: 30,
  step: 10,
  values: [10],
};

const customOptionsThird: Partial<IOptions> = {
  min: -100,
  max: -10,
  step: 0.33,
  isVertical: false,
  scaleCounts: 2,
  withProgress: false,
  values: [-33.01, -55.12],
};

const customOptionsFourth: Partial<IOptions> = {
  min: -1000,
  max: 10000,
  step: 0.33,
  scaleCounts: 5,
  withTooltip: false,
  isVertical: false,
  withScale: true,
  values: [33, 5000, 3000, 6534, 4043],
};

const customOptionsFive: Partial<IOptions> = { values: [1] };

const optionsArray = [
  customOptionsFirst,
  customOptionsSecond,
  customOptionsThird,
  customOptionsFourth,
  customOptionsFive,
];

demoElements.forEach((item, index) => {
  const sliderElement = item.querySelector<HTMLDivElement>(".js-demo__slider");
  const panelElement = item.querySelector<HTMLDivElement>(".js-demo__panel");
  if (sliderElement && panelElement) {
    const slider = $(sliderElement).rangeSlider(optionsArray[index]) as Slider;
    // eslint-disable-next-line no-new
    new Panel(panelElement, slider);
  }
});
