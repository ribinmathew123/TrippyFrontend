/* eslint-disable react/prop-types */
import  { useEffect, useState, useRef } from "react";
import "../../style/Carousel.css";

function Carousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timeOutRef = useRef(null);

  useEffect(() => {
    timeOutRef.current = autoPlay
      ? setTimeout(() => {
          slideRight();
        }, 6000)
      : null;

    return () => {
      clearTimeout(timeOutRef.current);
    };
    // eslint-disable-next-line
  }, [current, autoPlay]);

  const slideRight = () => {
    setCurrent((previousSlide) => (previousSlide === images.length - 1 ? 0 : previousSlide + 1));
  };

  const slideLeft = () => {
    setCurrent((previousSlide) => (previousSlide === 0 ? images.length - 1 : previousSlide - 1));
  };

  const handleMouseEnter = () => {
    setAutoPlay(false);
    clearTimeout(timeOutRef.current);
  };

  const handleMouseLeave = () => {
    setAutoPlay(true);
  };

  const handleDotClick = (index) => {
    setCurrent(index);
  };

  return (
    <div className="carousel" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="carousel_wrapper">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel_card ${index === current ? "carousel_card-active" : ""}`}
          >
            <img className="card_image" src={image.image} alt="" />
            <div className="card_overlay">
              <h2 className="card_title" style={{display:"flex",justifyContent:'center',alignItems:"center"}}><img height={30} width={3}style={{borderRadius:"50%"}} src="https://png.pngtree.com/png-vector/20190419/ourlarge/pngtree-vector-location-icon-png-image_956422.jpg" alt="" />{image.title}</h2>
            </div>
          </div>
        ))}
        <div className="carousel_arrow_left"  onClick={slideLeft}>
            &lsaquo;
        </div>
        <div className="carousel_arrow_right"  onClick={slideRight}>
            &rsaquo;
        </div>
        <div className="carousel_pagination">
          {images.map((_, index) => (
            <div
              key={index}
              className={`pagination_dot ${index === current ? "pagination_dot-active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
