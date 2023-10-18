import React, { useEffect, useState } from 'react';
import "./imageSlider.css";

// Define the structure of an image data
interface ImageData {
    id: number;
    imageUrl: string;
    photographer: string;
    category: string;
}

// Define the props for the ImageSlider component
interface ImageSliderProps {
    images: ImageData[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const VISIBLE_THUMBNAILS = 9;
    const HALF_VISIBLE_THUMBNAILS = Math.floor(VISIBLE_THUMBNAILS / 2);

    // States to handle the drag functionality
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    // Handle when mouse is pressed down, initializing the drag
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartPosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    // Handle when mouse is released, ending the drag
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Handle the dragging motion to navigate the slider
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;

        // Distinguish between horizontal and vertical drags based on window width
        if(window.innerWidth < 1400) {
            const currentX = event.clientX;
            const diffX = startPosition.x - currentX;
            const skipCountX = Math.round(diffX / 116); // assuming thumbnail width of 100px + 16px margin

            if (skipCountX) {
                const newIndex = (activeIndex + skipCountX) % images.length;
                setActiveIndex(newIndex < 0 ? images.length + newIndex : newIndex);
                setStartPosition(prev => ({ ...prev, x: currentX }));
            }
        } else {
            const currentY = event.clientY;
            const diffY = startPosition.y - currentY;
            const skipCountY = Math.round(diffY / 100); // assuming thumbnail height of 100px

            if (skipCountY) {
                const newIndex = (activeIndex + skipCountY) % images.length;
                setActiveIndex(newIndex < 0 ? images.length + newIndex : newIndex);
                setStartPosition(prev => ({ ...prev, y: currentY }));
            }
        }
    };

    // Handle when mouse leaves the drag area
    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    // Get visible thumbnails based on the active index
    const getVisibleImages = (index: number): ImageData[] => {
        const start = index - HALF_VISIBLE_THUMBNAILS;
        return Array.from({ length: VISIBLE_THUMBNAILS }, (_, i) =>
            images[(start + i + images.length) % images.length]
        );
    }

    const [visibleImages, setVisibleImages] = useState(getVisibleImages(activeIndex));

    // Handle scroll events to navigate the slider
    const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        const newIndex = (event.deltaY > 0)
            ? (activeIndex + 1) % images.length
            : (activeIndex - 1 + images.length) % images.length;
        setActiveIndex(newIndex);
    };

    // Update visible thumbnails when active index changes
    useEffect(() => {
        setVisibleImages(getVisibleImages(activeIndex));
    }, [activeIndex]);

    // Determine the CSS class for a thumbnail
    const getThumbnailClassName = (image: ImageData) => {
        const baseClass = "m-2 hover:opacity-75 object-contain max-w-100px thumbnail-image";
        return image.id === images[activeIndex].id
            ? `${baseClass} mb-4 mt-4 shadow-border-active thumbnail-image`
            : baseClass;
    };

    return (
        <div
            className="flex md:flex-row flex-col image-slider-body"
            onWheel={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Left Section (Header) */}
            <div className="w-1/5 md:w-1/4 text-white p-4 hidden md:block">
                <h2>Section Title</h2>
            </div>

            {/* Main Image Display */}
            <div className="flex justify-center items-center w-full md:w-3/5 p-4 large-image-div">
                <img
                    src={images[activeIndex].imageUrl}
                    alt={images[activeIndex].category}
                    className={`transition-opacity duration-500 ease-in-out max-w-2xl md:max-w-3/4 large-image`}
                />
            </div>

            {/* Image counter */}
            <div className="hidden md:flex md:w-1/6 justify-center items-center image-counter">
                <div className="mt-4 text-white p-2 rounded-md">
                    {activeIndex + 1} of {images.length}
                </div>
            </div>

            {/* Thumbnails Display */}
            <div className="md:w-1/5 p-4 flex md:flex-col flex-row items-center overflow-x-hidden md:overflow-y-hidden hide-scrollbar slider-content max-w-100">
                {visibleImages.map((image) => (
                    <img
                        key={image.id}
                        src={image.imageUrl}
                        alt={image.category}
                        className={getThumbnailClassName(image)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ImageSlider;
