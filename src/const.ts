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
    SLIDER = 'js-custom-slider',
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

const enum panelClasses {
  PANEL = 'js-panel',
  PANEL_ITEM = 'js-panel__item',
  PANEL_ITEM_INPUT = 'js-panel__item-input',
  PANEL_NEW_ITEM_INPUT = 'js-panel__new-item_input',
  PANEL_ITEM_CHECKBOX = 'js-panel__item-checkbox',
  PANEL_ADD_NEW_THUMB_BTN = 'js-panel__add-new_thumb-btn',
  PANEL_DELETE_THUMB_BTN = 'js-panel__delete-thumb-btn',
  PANEL_SWITCH_CONTAINER = 'js-panel__switch-container'
}

export {
  ObserverTypes, DEFAULT_OPTIONS, CSS_CLASSES, panelClasses,
};
