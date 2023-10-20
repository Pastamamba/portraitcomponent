export interface ImageData {
  id: number;
  imageUrl: string;
  photographer: string;
  category: string;
}

// Define the props for the ImageSlider component
export interface ImageSliderProps {
  images: ImageData[];
  sections: { title: string; data: ImageData[] }[];
  onSectionClick: (data: ImageData[]) => void;
}
