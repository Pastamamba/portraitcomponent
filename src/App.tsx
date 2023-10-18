import Header from "./components/Header.tsx";
import {mockData} from "./mockData.ts";
import ImageSlider from "./components/ImageSlider.tsx";

export const App = () => {
  return(
      <>
          <div className="bg-[#0b0b0b]">
        <Header photographer={mockData[0].photographer} category={mockData[0].category} />
        <ImageSlider images={mockData} />
          </div>
      </>
  )
}
