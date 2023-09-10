import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const BannerImgs = [
  "/media/img/mainBanner1.jpg",
  "/media/img/mainBanner1.jpg",
  "/media/img/mainBanner1.jpg",
]

const MainVisual = () => {
  return (
    <>
      <section className="main-banner-sec">
        <Swiper
          pagination={true} modules={[Pagination]} className="mySwiper"
        >
          {BannerImgs.map((imgs, index) => (
            <SwiperSlide id={index} key={index}>
              <img src={imgs} alt='' />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  )
}
export default MainVisual;