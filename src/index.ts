/**
 * Portrait Component — React Image Gallery
 *
 * Free tier: Basic image slider with drag/touch navigation, section-based
 * navigation, responsive layout, and GSAP animations.
 *
 * Pro tier: Fullscreen lightbox, keyboard navigation, and more.
 * Activate with a valid license key via <LicenseProvider>.
 */

// Core components
export { default as ImageSlider } from "./components/ImageSlider";
export { default as MainImage } from "./components/MainImage";
export { default as Thumbnails } from "./components/Thumbnails";
export { default as ImageCounter } from "./components/ImageCounter";
export { default as Header } from "./components/Header";
export { default as Sections } from "./components/Sections";

// Pro components
export { default as FullscreenOverlay } from "./components/FullscreenOverlay";

// License system
export { LicenseProvider, useLicense, useProFeature } from "./license";

// Hooks
export { default as useAnimations } from "./components/hooks/useAnimations";

// Types
export type {
  ImageData,
  ImageSliderProps,
  ThumbnailsProps,
  MainImageProps,
  ImageCounterProps,
} from "./utils/utils";

// Constants
export {
  VISIBLE_THUMBNAILS,
  HALF_VISIBLE_THUMBNAILS,
  LAYOUT_BREAKPOINT,
  DRAG_THRESHOLD_DESKTOP,
  DRAG_THRESHOLD_MOBILE,
  SCROLL_THRESHOLD,
  TOUCHPAD_DELTA_LIMIT,
  SCROLL_DEBOUNCE_THRESHOLD,
  SCROLL_DEBOUNCE_DELAY,
  SCROLL_COUNT_RESET_DELAY,
  SCROLL_COUNT_RESET_TRIGGER,
  IMAGE_FALLBACK_SRC,
} from "./constants";
