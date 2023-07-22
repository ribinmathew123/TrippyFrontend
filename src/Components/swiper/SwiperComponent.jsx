import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import PlaceCard from "./PlaceCard";

export default function SwiperComponent(props) {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          1206: {
            slidesPerView: 4,
          },
          950: {
            slidesPerView: 3,
          },
          650: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {props?.places?.slice(0,10).map((place, key) => (
          <SwiperSlide key={key}>
            <div style={{width:"100%", display:"flex",justifyContent:"center"}}>

            <PlaceCard place={place} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
