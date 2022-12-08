import { useState } from "react";

export interface ImageCarousel_Argument {
  urls: string[];
}
export function ImageCarousel(arg: ImageCarousel_Argument) {
  const [activeIndex, setActiveIndex] = useState(1);

  const { urls } = arg;
  const carouselId = "product_images_carousel";

  function next() {
    const newIndex = (activeIndex + 1) % urls.length;
    setActiveIndex(newIndex);
  }

  function prev() {
    const newIndex = activeIndex <= 1 ? urls.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  }

  return (
    <div id={carouselId} className="carousel slide" data-bs-ride="true">
      <div className="carousel-indicators">
        {urls.map((url, index) => (
          <button
            key={index}
            type="button"
            data-bs-target={carouselId}
            onClick={() => setActiveIndex(index)}
            className={mapClassName("", activeIndex === index)}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {urls.map((url, index) => (
          <div
            key={index}
            className={mapClassName("carousel-item", activeIndex === index)}
          >
            <img src={url} crossOrigin="anonymous" className="d-block w-100" />
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" onClick={prev}>
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" onClick={next}>
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

function mapClassName(name: string, isActive: boolean) {
  return isActive ? (name += " active") : name;
}
