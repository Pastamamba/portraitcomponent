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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const VISIBLE_THUMBNAILS = 13;
  const HALF_VISIBLE_THUMBNAILS = Math.floor(VISIBLE_THUMBNAILS / 2);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [distanceMoved, setDistanceMoved] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [scrollCount, setScrollCount] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [refreshCounter, setRefreshCounter] = useState<number>(0);
  const [isAnimationCompleted, setAnimationCompleted] =
    useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);

  // References to DOM elements for animations and interactions
  const mainImageRef = useRef<HTMLImageElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const counterNumberRef = useRef<HTMLDivElement>(null);

  const [currentImageWidth, setCurrentImageWidth] = useState<number | null>(null);
  const [prevImageWidth, setPrevImageWidth] = useState<number | null>(null);

  useAnimations({
    images,
    mainImageRef,
    thumbnailsRef,
    counterRef,
    counterNumberRef,
    setAnimationCompleted,
    activeIndex,
    currentImageWidth,
    prevImageWidth,
  });

  /**
   * Initiates the drag state and sets the starting position when the mouse is pressed.
   */
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setIsMouseDown(true);
    setStartPosition({ x: event.clientX, y: event.clientY });
    setStartX(event.clientX);
  };

  /**
   * Resets the drag state when the mouse is released.
   */
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsMouseDown(false);
    setDistanceMoved(0);
  };

  /**
   * Handles the dragging movement, calculating the new active image index based on the movement.
   */
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    let diff, current;
    if (window.innerWidth < 1400) {
      current = event.clientX;
      diff = startX - current;
    } else {
      current = event.clientY;
      diff = startPosition.y - current;
    }

    const threshold = window.innerWidth < 1400 ? 116 : 100;
    const skipCount = Math.round(diff / threshold);

    if (Math.abs(diff) >= threshold) {
      const newIndex = (activeIndex + skipCount) % images.length;
      setActiveIndex(newIndex < 0 ? images.length + newIndex : newIndex);

      setStartPosition({ x: current, y: event.clientY });
      setStartX(current);
    } else {
      setDistanceMoved(diff);
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
    setIsMouseDown(true);
    setStartPosition({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
  };

  /**
   * Resets the drag state when touch ends.
   */
  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsMouseDown(false);
    setDistanceMoved(0);
  };
  /**
   * Same as handleMouseMove, but for touch events.
   */
  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    event.preventDefault();
    let diff, current;
    if (window.innerWidth < 1400) {
      current = event.touches[0].clientX;
      diff = startPosition.x - current;
    } else {
      current = event.touches[0].clientY;
      diff = startPosition.y - current;
    }

    const threshold = window.innerWidth < 1400 ? 116 : 100;
    const skipCount = Math.round(diff / threshold);

    if (Math.abs(diff) >= threshold) {
      const newIndex = (activeIndex + skipCount) % images.length;
      setActiveIndex(newIndex < 0 ? images.length + newIndex : newIndex);

      // Reset starting position
      setStartPosition({ x: current, y: event.touches[0].clientY });
    } else {
      setDistanceMoved(diff);
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

    const isTouchpad = Math.abs(event.deltaY) < 50;

    let newIndex;
    if (isTouchpad) {
      if (Math.abs(event.deltaY) > 2) {
        newIndex =
            event.deltaY > 0
                ? (activeIndex + 1) % images.length
                : (activeIndex - 1) % images.length;
      } else {
        return;
      }
    } else {
      newIndex =
          event.deltaY > 0
              ? (activeIndex + 1) % images.length
              : (activeIndex - 1) % images.length;
    }

    if (newIndex < 0) {
      newIndex = images.length - 1;
    }
    setActiveIndex(newIndex);
    setScrollDirection(event.deltaY > 0 ? "down" : "up");
    setScrollCount((prev) => prev + 1);
    setRefreshCounter((prev) => prev + 1);
  };

  /**
   * Updates the set of visible images whenever the active index changes.
   */
  useEffect(() => {
    setVisibleImages(getVisibleImages(activeIndex));
    setPrevImageWidth(currentImageWidth);
  }, [activeIndex]);

  useEffect(() => {
    if (scrollCount > 2) {
      const timer = setTimeout(() => {
        setScrollCount(0);
      }, 20);

      return () => clearTimeout(timer);
    }
  }, [scrollCount]);

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
      <MainImage
          mainImageRef={mainImageRef}
          image={{
            ...images[activeIndex],
            onWidthChange: (width: number) => setCurrentImageWidth(width)
          }}
      />
      <ImageCounter
        counterRef={counterRef}
        counterNumberRef={counterNumberRef}
        activeIndex={activeIndex}
        totalImages={images.length}
      />
      <Thumbnails
        thumbnailsRef={thumbnailsRef}
        isMouseDown={isMouseDown}
        visibleImages={visibleImages}
        scrollDirection={scrollDirection}
        distanceMoved={distanceMoved}
        refreshCounter={refreshCounter}
        scrollCount={scrollCount}
      />
    </div>
  );
};

export default ImageSlider;
