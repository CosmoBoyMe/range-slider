const enum ObserverTypes {
    VALUE_UPDATED = 'VALUE_UPDATED',
    UPDATE_VALUE = 'UPDATE_VALUE',
    OPTIONS_CHANGED = 'OPTIONS_CHANGED',
}

const DEFAULT_OPTIONS = {
  min: 0,
  max: 10,
  step: 1,
  scaleCounts: 11,
  values: [5, 6],
  vertical: true,
  scale: true,
  tooltip: true,
  progress: true,
};

const enum CSS_CLASSES {
    TRACK = 'js-track',
    TRACK_VERTICAL = 'js-track--vertical',
    THUMB = 'js-thumb',
    THUMB_VERTICAL = 'js-thumb--vertical',
    TOOLTIP = 'js-tooltip',
    TOOLTIP_VERTICAL = 'js-tooltip--vertical',
    PROGRESS = 'js-progress',
    PROGRESS_VERTICAL = 'js-progress--vertical',
    SCALE = 'js-scale',
    SCALE_VERTICAL = 'js-scale--vertical',
    SCALE_POINT = 'js-scale__point',
    SCALE_POINT_VERTICAL = 'js-scale__point--vertical',
}

export { ObserverTypes, DEFAULT_OPTIONS, CSS_CLASSES };
