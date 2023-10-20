import React from "react";
import { ImageSliderProps } from "../utils/utils";

const Sections: React.FC<
  Pick<ImageSliderProps, "sections" | "onSectionClick">
> = ({ sections, onSectionClick }) => (
  <div className="w-1/5 md:w-1/4 text-white p-4 section-title">
    {sections.map((section, index) => (
      <h2 key={index} onClick={() => onSectionClick(section.data)}>
        {section.title}
      </h2>
    ))}
  </div>
);

export default Sections;
