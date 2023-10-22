import React from "react";
import { ImageCounterProps } from "../utils/utils";

/**
 * ImageCounter Component
 *
 * Displays the current image number relative to the total number of images.
 * For instance, "1 of 5" indicates that the first image out of a total of 5 images is currently displayed.
 *
 * @param counterRef - Ref to the main counter container.
 * @param counterNumberRef - Ref to the container of the currently active image's number.
 * @param activeIndex - Index of the currently active image.
 * @param totalImages - Total number of images in the gallery.
 *
 * @returns JSX element for the image counter.
 */
const ImageCounter: React.FC<ImageCounterProps> = ({
  counterRef,
  counterNumberRef,
  activeIndex,
  totalImages,
}) => (
  <div
    ref={counterRef}
    className="md:flex justify-center items-center image-counter slide-fade-in"
  >
    <div style={{ width: "110px", display: "flex", marginTop: "-15px" }}>
      {/* Display the currently active image's number */}
      <div
        ref={counterNumberRef}
        className="mt-4 text-white p-2 rounded-md counter-index"
      >
        {activeIndex + 1}
      </div>
      {/* "of" divider */}
      <div className="mt-4 text-white p-2 rounded-md">of</div>
      {/* Display the total number of images */}
      <div className="mt-4 ml-2 text-white p-2 rounded-md counter-total">
        {totalImages}
      </div>
    </div>
  </div>
);

export default ImageCounter;
