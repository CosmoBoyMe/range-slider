import type { IOptions } from './types';
import { Slider } from './Slider';

declare global {
  interface JQuery {
    rangeSlider(option?: Partial<IOptions>): Slider | undefined;
  }
}

(function plugin($) {
  // eslint-disable-next-line no-param-reassign
  $.fn.rangeSlider = function slider(this:JQuery, option: Partial<IOptions> = {}) {
    const element = $(this).get(0);
    if (element) {
      return new Slider(element, option);
    }
    return undefined;
  };
}(jQuery));
