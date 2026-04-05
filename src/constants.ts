/**
 * Configuration constants for the Portrait Component image slider.
 *
 * Centralizes magic numbers and thresholds to improve maintainability
 * and make the component easier to customize.
 */

/** Number of thumbnail images visible at once in the carousel */
export const VISIBLE_THUMBNAILS = 13;

/** Half of visible thumbnails, used for centering the active image */
export const HALF_VISIBLE_THUMBNAILS = Math.floor(VISIBLE_THUMBNAILS / 2);

/** Breakpoint (in px) at which the layout switches from vertical to horizontal */
export const LAYOUT_BREAKPOINT = 1400;

/** Drag threshold (in px) for desktop layout before advancing to next image */
export const DRAG_THRESHOLD_DESKTOP = 100;

/** Drag threshold (in px) for mobile/horizontal layout before advancing to next image */
export const DRAG_THRESHOLD_MOBILE = 116;

/** Accumulated deltaY threshold for touchpad scroll detection */
export const SCROLL_THRESHOLD = 100;

/** DeltaY value below which input is considered touchpad (vs. mouse wheel) */
export const TOUCHPAD_DELTA_LIMIT = 50;

/** Scroll count at which debounce kicks in for thumbnail key updates */
export const SCROLL_DEBOUNCE_THRESHOLD = 4;

/** Debounce delay (in ms) for thumbnail key updates during rapid scrolling */
export const SCROLL_DEBOUNCE_DELAY = 50;

/** Scroll count reset delay (in ms) */
export const SCROLL_COUNT_RESET_DELAY = 20;

/** Scroll count trigger for reset */
export const SCROLL_COUNT_RESET_TRIGGER = 2;

/** Placeholder image used when an image fails to load */
export const IMAGE_FALLBACK_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-family='sans-serif' font-size='16'%3EImage unavailable%3C/text%3E%3C/svg%3E";
