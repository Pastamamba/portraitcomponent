import Header from "./components/Header.tsx";
import { mockData, mockData1 } from "./mockData.ts";
import ImageSlider from "./components/ImageSlider.tsx";
import { useState } from "react";
import { ImageData } from "./utils/utils.ts";

// App component structure
export const App = () => {
  // Define sections with associated image datasets
  const sections = [
    { title: "Section 1", data: mockData },
    { title: "Section 2", data: mockData1 },
  ];

  // State to manage currently displayed images in the slider
  const [currentImages, setCurrentImages] = useState<ImageData[]>(
    sections[0].data
  );

  // Function to change images based on section clicked
  const changeImagesBySection = (data: ImageData[]) => {
    setCurrentImages(data);
  };

  return (
    <div className="bg-[#0b0b0b]">
      {/* Display header with photographer and category details */}
      <Header
        photographer={currentImages[0].photographer}
        category={currentImages[0].category}
      />

      {/* Image Slider to display images with associated sections */}
      <ImageSlider
        key={currentImages[0].id}
        images={currentImages}
        sections={sections}
        onSectionClick={changeImagesBySection}
      />
    </div>
  );
};
