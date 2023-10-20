import React, { RefObject } from "react";
import { ImageData } from "../utils/utils";

// Props interface for the Thumbnails component
interface ThumbnailsProps {
  thumbnailsRef: RefObject<HTMLDivElement>; // Ref for the thumbnails container
  visibleImages: ImageData[]; // List of images to be displayed as thumbnails
  activeImage: ImageData; // Currently selected or active image
}

const Thumbnails: React.FC<ThumbnailsProps> = ({
  thumbnailsRef,
  visibleImages,
  activeImage,
}) => {
  /**
   * Compute CSS class names for a given thumbnail image.
   *
   * @param image - The thumbnail image data.
   * @returns - The computed CSS class string.
   */
  const getThumbnailClassName = (image: ImageData) => {
    const baseClass =
      "m-2 hover:opacity-75 object-contain max-w-100px thumbnail-image";

    // Add an active shadow border if the image is the currently active one
    return image.id === activeImage.id
      ? `${baseClass} mb-4 mt-4 shadow-border-active thumbnail-image`
      : baseClass;
  };

  return (
    <div
      ref={thumbnailsRef}
      // Styling and layout for the thumbnail container. Adjusts based on screen size.
      className="md:w-1/5 p-4 flex md:flex-col flex-row items-center overflow-x-hidden md:overflow-y-hidden hide-scrollbar slider-content max-w-100"
    >
      {/* Render each thumbnail image */}
      {visibleImages.map((image) => (
        <img
          key={image.id} // React list key
          src={image.imageUrl} // Image URL
          alt={image.category} // Alt text based on image category
          className={`${getThumbnailClassName(image)}`} // Assign dynamic class
        />
      ))}
    </div>
  );
};

export default Thumbnails;
