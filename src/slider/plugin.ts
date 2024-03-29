import type { IOptions } from "./types/IOptions";
import { Slider } from "./Slider";

declare global {
  interface JQuery {
    rangeSlider(option?: Partial<IOptions>): Slider | null;
  }
}

(function plugin($) {
  // eslint-disable-next-line no-param-reassign
  $.fn.rangeSlider = function slider(
    this: JQuery,
    option: Partial<IOptions> = {}
  ) {
    const element = $(this).get(0);
    if (element) {
      return new Slider(element, option);
    }
    return null;
  };
})(jQuery);
