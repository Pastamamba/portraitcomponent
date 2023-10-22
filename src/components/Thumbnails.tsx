import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { ThumbnailsProps } from "../utils/utils";

const Thumbnails: React.FC<ThumbnailsProps> = ({
  thumbnailsRef,
  visibleImages,
  scrollDirection,
  refreshCounter,
  scrollCount,
  distanceMoved,
  isMouseDown,
}) => {
  const [randomKey, setRandomKey] = useState<number>(Math.random());

  // Function to update the random key
  const updateKey = useCallback(() => {
    setRandomKey(Math.random());
  }, []);

  useEffect(() => {
    // Debounce function for updating the key, based on the scroll count
    const updateKeyWithDebounce =
      scrollCount > 4 ? debounce(updateKey, 50) : updateKey;

    updateKeyWithDebounce();

    // Cleanup the debounced function when the component is unmounted
    return () => {
      updateKeyWithDebounce.cancel && updateKeyWithDebounce.cancel();
    };
  }, [refreshCounter, scrollCount, updateKey]);

  // Determines the thumbnail animation class based on viewport width and scroll direction
  const getThumbnailAnimationClass = () => {
    if (window.innerWidth < 1400) {
      return scrollDirection === "down"
        ? "thumbnail-entering-right"
        : "thumbnail-entering-left";
    } else {
      return scrollDirection === "down"
        ? "thumbnail-entering-down"
        : "thumbnail-entering-up";
    }
  };

  // Get the CSS class names for the thumbnail images
  const getThumbnailClassName = () => {
    const baseClass =
      "m-2 hover:opacity-75 object-contain max-w-100px thumbnail-image";
    return `${baseClass} ${getThumbnailAnimationClass()}`;
  };

  // CSS styles for the thumbnail's inner content
  const innerContentStyles = {
    transition: isMouseDown ? "" : "transform 0.3s ease-out",
    transform:
      window.innerWidth < 1400
        ? `translateX(${-distanceMoved}px)`
        : `translateY(${-distanceMoved}px)`,
  };

  return (
    <div
      key={randomKey}
      ref={thumbnailsRef}
      className="md:w-1/5 p-4 flex md:flex-col flex-row items-center overflow-x-hidden
      md:overflow-y-hidden hide-scrollbar slider-content max-w-100"
    >
      <div className="inner-content" style={innerContentStyles}>
        {visibleImages.map((image) => (
          <img
            key={image.id}
            src={image.imageUrl}
            alt={image.category}
            className={getThumbnailClassName()}
          />
        ))}
      </div>
    </div>
  );
};

export default Thumbnails;
