const enum ObserverTypes {
  VALUE_UPDATED = "VALUE_UPDATED",
  UPDATE_VALUE = "UPDATE_VALUE",
  OPTIONS_CHANGED = "OPTIONS_CHANGED",
}

const DEFAULT_OPTIONS = {
  min: 0,
  max: 10,
  step: 1,
  scaleCounts: 11,
  values: [5, 6],
  isVertical: true,
  withScale: true,
  withTooltip: true,
  withProgress: true,
};

const enum CSS_CLASSES {
  SLIDER = "js-custom-slider",
  TRACK = "js-track",
  TRACK_VERTICAL = "js-track--vertical",
  THUMB = "js-thumb",
  THUMB_VERTICAL = "js-thumb--vertical",
  THUMB_ACTIVE = "js-thumb--active",
  TOOLTIP = "js-tooltip",
  TOOLTIP_VERTICAL = "js-tooltip--vertical",
  PROGRESS = "js-progress",
  PROGRESS_VERTICAL = "js-progress--vertical",
  SCALE = "js-scale",
  SCALE_VERTICAL = "js-scale--vertical",
  SCALE_POINT = "js-scale__point",
  SCALE_POINT_VERTICAL = "js-scale__point--vertical",
}

const enum panelClasses {
  PANEL = "js-panel",
  MIN_FIELD = "js-panel__min-field",
  MAX_FIELD = "js-panel__max-field",
  STEP_FIELD = "js-panel__step-field",
  SCALE_COUNTS_FIELD = "js-panel__scale-counts-field",
  THUMB_VALUES = "js-panel__thumbs-values",
  THUMB_VALUE_FIELD = "js-panel__thumb-value-field",
  TOGGLE_VERTICAL_FIELD = "js-panel__toggle-vertical-field",
  TOGGLE_SCALE_FIELD = "js-panel__toggle-scale-field",
  TOGGLE_TOOLTIP_FIELD = "js-panel__toggle-tooltip-field",
  TOGGLE_PROGRESS_FIELD = "js-panel__toggle-progress-field",
  NEW_THUMB_FIELD = "js-panel__add-new-thumb-field",
  NEW_THUMB_BUTTON_FIELD = "js-panel__add-new-thumb-button-field",
}

export { ObserverTypes, DEFAULT_OPTIONS, CSS_CLASSES, panelClasses };
