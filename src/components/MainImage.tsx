import React from "react";
import { MainImageProps } from "../utils/utils";

const MainImage: React.FC<MainImageProps> = ({ mainImageRef, image }) => {
    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const imageWidth = e.currentTarget.naturalWidth;
        if (typeof image.onWidthChange === "function") {
            image.onWidthChange(imageWidth);
        }
    };

    return (
        <div className="flex justify-center items-center w-full md:w-3/5 p-4 large-image-div">
            <img
                ref={mainImageRef}
                src={image.imageUrl}
                alt={image.category}
                onLoad={handleImageLoad}
                className={`transition-opacity duration-500 ease-in-out max-w-2xl md:max-w-3/4 large-image`}
            />
        </div>
    );
};

export default MainImage;
