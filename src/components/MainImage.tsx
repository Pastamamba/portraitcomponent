import React, { RefObject } from "react";
import { ImageData } from "../utils/utils";

interface MainImageProps {
  mainImageRef: RefObject<HTMLImageElement>;
  image: ImageData;
}

const MainImage: React.FC<MainImageProps> = ({ mainImageRef, image }) => (
  <div className="flex justify-center items-center w-full md:w-3/5 p-4 large-image-div">
    <img
      ref={mainImageRef}
      src={image.imageUrl}
      alt={image.category}
      className={`transition-opacity duration-500 ease-in-out max-w-2xl md:max-w-3/4 large-image`}
    />
  </div>
);

export default MainImage;
