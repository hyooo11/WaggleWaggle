import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "./Swiper.css";

const SwiperPerView = ({ ImageArr }) => {
  const images = ImageArr.filter((value) => value !== null);
  const viweOption = () => {
    if (images.length >= 4) {
      return 2;
    } else if (images.length <= 3) {
      return 1;
    }
  };

  const layoutOption = () => {
    if (images.length >= 4) {
      return "max_slide";
    } else if (images.length <= 3) {
      return "min_slide";
    }
  };

  // console.log(images);
  return (
    <Swiper
      slidesPerView={viweOption()}
      centeredSlides={true}
      loop={true}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination, A11y]}
      className={["SwiperPerView", `slidesPerView_${layoutOption()}`].join(" ")}
    >
      {images.map((data, index) => {
        return (
          <SwiperSlide key={index}>
            <figure>
              <img src={data} />
            </figure>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export { SwiperPerView };
