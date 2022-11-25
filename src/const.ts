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

const enum SliderClasses {
  SLIDER = "custom-slider",
  TRACK = "track",
  TRACK_VERTICAL = "track_position_vertical",
  THUMB = "thumb",
  THUMB_VERTICAL = "thumb_position_vertical",
  THUMB_ACTIVE = "thumb_active",
  TOOLTIP = "tooltip",
  TOOLTIP_VERTICAL = "tooltip_position_vertical",
  PROGRESS = "progress",
  PROGRESS_VERTICAL = "progress_position_vertical",
  SCALE = "scale",
  SCALE_VERTICAL = "scale_position_vertical",
  SCALE_POINT = "scale__point",
  SCALE_POINT_VERTICAL = "scale__point_position_vertical",
}

const enum PanelClasses {
  PANEL = "panel",
  MIN_FIELD = "panel__min-field",
  MAX_FIELD = "panel__max-field",
  STEP_FIELD = "panel__step-field",
  SCALE_COUNTS_FIELD = "panel__scale-counts-field",
  THUMB_VALUES = "panel__thumbs-values",
  THUMB_VALUE_FIELD = "panel__thumb-value-field",
  TOGGLE_VERTICAL_FIELD = "panel__toggle-vertical-field",
  TOGGLE_SCALE_FIELD = "panel__toggle-scale-field",
  TOGGLE_TOOLTIP_FIELD = "panel__toggle-tooltip-field",
  TOGGLE_PROGRESS_FIELD = "panel__toggle-progress-field",
  NEW_THUMB_FIELD = "panel__add-new-thumb-field",
  NEW_THUMB_BUTTON_FIELD = "panel__add-new-thumb-button-field",
}

export { ObserverTypes, DEFAULT_OPTIONS, SliderClasses, PanelClasses };
