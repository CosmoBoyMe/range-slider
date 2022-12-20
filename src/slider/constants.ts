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

export { ObserverTypes, DEFAULT_OPTIONS, SliderClasses };
