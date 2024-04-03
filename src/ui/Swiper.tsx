import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "./Swiper.css";

type ImgsProps = {
  bannerImgs?: string[];
  ImageArr?: string[];
};

export const MainSwiper = ({ bannerImgs }: ImgsProps) => {
  return (
    <Swiper
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{
        clickable: true,
        type: "progressbar",
      }}
      modules={[Pagination, Autoplay, A11y]}
      className="MainSwiper"
    >
      {bannerImgs &&
        bannerImgs.map((data, index) => {
          return (
            <SwiperSlide key={index}>
              <figure>
                <img src={data} alt={`메인배너_${index}`} />
              </figure>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export const SwiperPerView = ({ ImageArr }: ImgsProps) => {
  const images = ImageArr?.filter((value) => value !== null);
  const viweOption = () => {
    if (images) {
      if (images.length >= 4) {
        return 2;
      } else if (images.length <= 3) {
        return 1;
      }
    }
  };

  const layoutOption = () => {
    if (images) {
      if (images.length >= 4) {
        return "max_slide";
      } else if (images.length <= 3) {
        return "min_slide";
      }
    }
  };

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
      {images &&
        images.map((data, index) => {
          return (
            <SwiperSlide key={index}>
              <figure>
                <img src={data} alt={`${index}번째 이미지`} />
              </figure>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
