import { useEffect, useState, useRef } from "react";
import SwiperComponent from "../../swiper/SwiperComponent";
import server from "../../../Axios/axios";

function PlaceBox() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await server.get("allPlace");
        const data = response.data;
        console.log(data);

        setPlaces(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleMouseEnter = (index) => {
    if (imageRefs.current[index]) {
      imageRefs.current[index].style.opacity = "0";
    }
  };

  const handleMouseLeave = (index) => {
    if (imageRefs.current[index]) {
      imageRefs.current[index].style.opacity = "1";
    }
  };

  const imageRefs = useRef(new Array(places.length * 2));

  useEffect(() => {
    const refs = imageRefs.current;

    refs.forEach((ref, index) => {
      if (ref) {
        ref.addEventListener("mouseenter", () => handleMouseEnter(index));
        ref.addEventListener("mouseleave", () => handleMouseLeave(index));
      }
    });

    return () => {
      refs.forEach((ref, index) => {
        if (ref) {
          ref.removeEventListener("mouseenter", () => handleMouseEnter(index));
          ref.removeEventListener("mouseleave", () => handleMouseLeave(index));
        }
      });
    };
  }, [places.length]);
  return (
    <div>
      <h1 className="font-Poppins font-bold text-3xl ml-14 mb-7">
        Trending Destinations in Kerala
      </h1>
      <SwiperComponent places={places} />
    </div>
  );
}

export default PlaceBox;
