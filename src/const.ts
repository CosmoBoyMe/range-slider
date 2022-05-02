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
}

export { ObserverTypes, DEFAULT_OPTIONS, CSS_CLASSES };
