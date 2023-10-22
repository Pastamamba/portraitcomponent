import { RefObject } from "react";

export interface ImageData {
  id: number;
  imageUrl: string;
  photographer: string;
  category: string;
  onWidthChange?: (width: number) => void;
}

// Define the props for the ImageSlider component
export interface ImageSliderProps {
  images: ImageData[];
  sections: { title: string; data: ImageData[] }[];
  onSectionClick: (data: ImageData[]) => void;
}

export interface ThumbnailsProps {
  thumbnailsRef: RefObject<HTMLDivElement>;
  visibleImages: ImageData[];
  scrollDirection: "up" | "down" | null;
  refreshCounter: number;
  scrollCount: number;
  distanceMoved: number;
  isMouseDown: boolean;
}

export interface MainImageProps {
  mainImageRef: RefObject<HTMLImageElement>;
  image: ImageData;
}

// Define the properties for the ImageCounter component
export interface ImageCounterProps {
  counterRef: RefObject<HTMLDivElement>; // Reference to the main counter container
  counterNumberRef: RefObject<HTMLDivElement>; // Reference to the current image number container
  activeIndex: number; // Current active image's index
  totalImages: number; // Total number of images in the gallery
}
