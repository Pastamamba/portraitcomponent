import React, { useEffect, useCallback } from "react";
import { useProFeature } from "../license";

interface FullscreenOverlayProps {
  imageUrl: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Pro Feature: Fullscreen lightbox overlay for the main image.
 * Only renders when Pro license is active.
 */
const FullscreenOverlayComponent: React.FC<FullscreenOverlayProps> = ({
  imageUrl,
  alt,
  isOpen,
  onClose,
}) => {
  const isPro = useProFeature();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isPro || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen image view"
    >
      <button
        className="absolute top-6 right-6 text-white text-4xl font-light hover:text-gray-300 transition-colors z-[101]"
        onClick={onClose}
        aria-label="Close fullscreen view"
      >
        ✕
      </button>
      <img
        src={imageUrl}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] object-contain select-none"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

const FullscreenOverlay = React.memo(FullscreenOverlayComponent);
export default FullscreenOverlay;
