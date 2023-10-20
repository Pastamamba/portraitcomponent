import { useEffect } from "react";
import gsap from "gsap";
import { ImageData } from "../../utils/utils";

interface UseAnimationsProps {
  images: ImageData[];
  mainImageRef: React.RefObject<HTMLImageElement>;
  thumbnailsRef: React.RefObject<HTMLDivElement>;
  counterRef: React.RefObject<HTMLDivElement>;
  counterNumberRef: React.RefObject<HTMLDivElement>;
  setAnimationCompleted: (completed: boolean) => void;
  activeIndex: number;
}

/**
 * Custom hook for executing GSAP animations for the image slider.
 *
 * @param props - animation properties required for the hook
 */
const useAnimations = ({
  images,
  mainImageRef,
  thumbnailsRef,
  counterRef,
  counterNumberRef,
  setAnimationCompleted,
  activeIndex,
}: UseAnimationsProps) => {
  /**
   * Effect responsible for initializing and cleaning up the main animations.
   * It animates the main image, thumbnails and counter on component mount.
   * When the component is unmounted, it will also cleanup any active GSAP tweens.
   */
  useEffect(() => {
    const centerScreenX = window.innerWidth / 2;
    const centerScreenY = window.innerHeight / 2;

    const thumbnailStartingX =
      centerScreenX - (thumbnailsRef.current?.offsetWidth || 0) / 2;
    const thumbnailStartingY =
      centerScreenY - (thumbnailsRef.current?.offsetHeight || 0) / 2;

    // Convert the HTMLCollection to an array and check if it's non-empty.
    const thumbnailChildren = Array.from(thumbnailsRef.current?.children || []);
    if (thumbnailChildren.length > 0) {
      // Animate thumbnail children from a central position to their original positions.
      gsap.fromTo(
        thumbnailChildren,
        { x: thumbnailStartingX, y: thumbnailStartingY },
        { x: 0, y: 0, duration: 1.2 }
      );
    }

    // Animate the main image to appear and scale up.
    gsap.to(mainImageRef.current!, {
      scale: 1,
      autoAlpha: 1,
      duration: 1,
      ease: "back.out(1.7)",
    });

    // Fade in and scale up the counter, then set animation completed.
    gsap
      .from(counterRef.current!, {
        autoAlpha: 1,
        scale: 1,
        ease: "back.out(1.7)",
        duration: 1,
      })
      .then(() => {
        setAnimationCompleted(true);
      });

    // Cleanup function to kill GSAP tweens on component unmount.
    return () => {
      if (mainImageRef.current) gsap.killTweensOf(mainImageRef.current);
      if (thumbnailsRef.current) gsap.killTweensOf(thumbnailsRef.current);
      if (counterRef.current) gsap.killTweensOf(counterRef.current);
    };
  }, [counterRef, images, mainImageRef, setAnimationCompleted, thumbnailsRef]);

  /**
   * Effect to animate the number in the counter whenever the active image index changes.
   */
  useEffect(() => {
    if (counterNumberRef.current) {
      // Move the counter number upwards and fade it out.
      gsap.to(counterNumberRef.current, {
        y: "-25%",
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          // Move the counter number from below and fade it in.
          gsap.fromTo(
            counterNumberRef.current,
            {
              y: "25%",
              opacity: 0,
            },
            {
              y: "0%",
              opacity: 1,
              duration: 0.1,
            }
          );
        },
      });
    }
  }, [activeIndex, counterNumberRef]);
};

export default useAnimations;
