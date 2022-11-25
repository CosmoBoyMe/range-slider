import "../index";
import type { IOptions } from "../types";
import { Slider } from "../Slider";
import "./style.scss";
import { Panel } from "./Panel/Panel";
import "./components/button/button.scss";
import "./components/input-field/input-field.scss";
import "./components/toggle-field/toggle-field.scss";

const demoElements = document.querySelectorAll(
  ".demo"
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

const customOptionsFive = { values: [1] };

const optionsArray = [
  customOptionsFirst,
  customOptionsSecond,
  customOptionsThird,
  customOptionsFourth,
  customOptionsFive,
];

demoElements.forEach((item, index) => {
  const sliderEl = item.querySelector(".slider") as HTMLElement;
  const panelEl = item.querySelector(".panel") as HTMLElement;
  const slider = $(sliderEl).rangeSlider(optionsArray[index]) as Slider;
  // eslint-disable-next-line no-new
  new Panel(panelEl, slider);
});
