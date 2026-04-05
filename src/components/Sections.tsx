import React from "react";
import { ImageSliderProps } from "../utils/utils";

const Sections: React.FC<
  Pick<ImageSliderProps, "sections" | "onSectionClick">
> = ({ sections, onSectionClick }) => (
  <nav
    className="w-1/5 md:w-1/4 text-white p-4 section-title"
    aria-label="Image gallery sections"
  >
    {sections.map((section, index) => (
      <h2
        key={index}
        onClick={() => onSectionClick(section.data)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSectionClick(section.data);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View ${section.title}`}
      >
        {section.title}
      </h2>
    ))}
  </nav>
);

export default Sections;
