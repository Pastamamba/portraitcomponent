import React, { useEffect, useState, useRef } from "react";
import "./imageSlider.css";
import { ImageData, ImageSliderProps } from "../utils/utils";
import Thumbnails from "./Thumbnails";
import ImageCounter from "./ImageCounter";
import MainImage from "./MainImage";
import Sections from "./Sections";
import useAnimations from "./hooks/useAnimations";

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  sections,
  onSectionClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const VISIBLE_THUMBNAILS = 9;
  const HALF_VISIBLE_THUMBNAILS = Math.floor(VISIBLE_THUMBNAILS / 2);

  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [isAnimationCompleted, setAnimationCompleted] = useState(false);

  // References to the DOM elements for animations and interactions
  const mainImageRef = useRef<HTMLImageElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const counterNumberRef = useRef<HTMLDivElement>(null);

  useAnimations({
    images,
    mainImageRef,
    thumbnailsRef,
    counterRef,
    counterNumberRef,
    setAnimationCompleted,
    activeIndex,
  });

  /**
   * Initiates the drag state and sets the starting position when the mouse is pressed.
   */
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPosition({ x: event.clientX, y: event.clientY });
  };

  /**
   * Resets the drag state when the mouse is released.
   */
  const handleMouseUp = () => setIsDragging(false);

  /**
   * Handles the dragging movement, calculating the new active image index based on the movement.
   */
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const current = window.innerWidth < 1400 ? event.clientX : event.clientY;
    const diff = startPosition.x - current;
    const skipCount =
      window.innerWidth < 1400
        ? Math.round(diff / 116)
        : Math.round(diff / 100);

    if (skipCount) {
      const newIndex = (activeIndex + skipCount) % images.length;
      setActiveIndex(newIndex < 0 ? images.length + newIndex : newIndex);
      setStartPosition((prev) => ({ ...prev, x: current }));
    }
  };

  /**
   * Resets the drag state when the mouse leaves the container.
   */
  const handleMouseLeave = () => setIsDragging(false);

  /**
   * Initiates the drag state and sets the starting position when touch starts.
   */
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPosition({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
  };

  /**
   * Resets the drag state when touch ends.
   */
  const handleTouchEnd = () => setIsDragging(false);

  /**
   * Same as handleMouseMove, but for touch events.
   */
  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const current =
      window.innerWidth < 1400
        ? event.touches[0].clientX
        : event.touches[0].clientY;
    const diff = startPosition.x - current;
    const skipCount =
      window.innerWidth < 1400
        ? Math.round(diff / 116)
        : Math.round(diff / 100);

    if (skipCount) {
      const newIndex = (activeIndex + skipCount) % images.length;
      setActiveIndex(newIndex < 0 ? images.length + newIndex : newIndex);
      setStartPosition((prev) => ({ ...prev, x: current }));
    }
  };

  /**
   * Returns a subset of images centered around the given index, for displaying as visible thumbnails.
   */
  const getVisibleImages = (index: number): ImageData[] => {
    const start = index - HALF_VISIBLE_THUMBNAILS;
    return Array.from(
      { length: VISIBLE_THUMBNAILS },
      (_, i) => images[(start + i + images.length) % images.length]
    );
  };

  const [visibleImages, setVisibleImages] = useState(
    getVisibleImages(activeIndex)
  );

  /**
   * Handles the change in active image index based on the scroll direction.
   */
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!isAnimationCompleted) return;
    let newIndex =
      event.deltaY > 0
        ? (activeIndex + 1) % images.length
        : (activeIndex - 1) % images.length;
    if (newIndex < 0) {
      newIndex = images.length - 1;
    }
    setActiveIndex(newIndex);
  };

  /**
   * Updates the set of visible images whenever the active index changes.
   */
  useEffect(() => {
    setVisibleImages(getVisibleImages(activeIndex));
  }, [activeIndex]);

  return (
    <div
      className="flex md:flex-row flex-col image-slider-body"
      onWheel={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <Sections sections={sections} onSectionClick={onSectionClick} />
      <MainImage mainImageRef={mainImageRef} image={images[activeIndex]} />
      <ImageCounter
        counterRef={counterRef}
        counterNumberRef={counterNumberRef}
        activeIndex={activeIndex}
        totalImages={images.length}
      />
      <Thumbnails
        thumbnailsRef={thumbnailsRef}
        visibleImages={visibleImages}
        activeImage={images[activeIndex]}
      />
    </div>
  );
};

export default ImageSlider;
