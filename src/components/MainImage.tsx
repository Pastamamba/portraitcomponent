import React from "react";
import { MainImageProps } from "../utils/utils";
import { IMAGE_FALLBACK_SRC } from "../constants";

const MainImageComponent: React.FC<MainImageProps> = ({ mainImageRef, image, onClick }) => {
    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const imageWidth = e.currentTarget.naturalWidth;
        if (typeof image.onWidthChange === "function") {
            image.onWidthChange(imageWidth);
        }
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = IMAGE_FALLBACK_SRC;
    };

    return (
        <div
            className={`flex justify-center items-center w-full md:w-3/5 p-4 large-image-div${onClick ? " cursor-pointer" : ""}`}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            aria-label={onClick ? "Open fullscreen view" : undefined}
            onKeyDown={onClick ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick();
                }
            } : undefined}
        >
            <img
                ref={mainImageRef}
                src={image.imageUrl}
                alt={image.category}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`transition-opacity duration-500 ease-in-out max-w-2xl md:max-w-3/4 large-image`}
            />
        </div>
    );
};

const MainImage = React.memo(MainImageComponent);
export default MainImage;
