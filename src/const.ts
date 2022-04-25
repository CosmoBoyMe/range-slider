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
  vertical: true,
  scale: true,
  tooltip: true,
  progress: true,
  values: [5, 6],
};

export { ObserverTypes, DEFAULT_OPTIONS };
