import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const MainVisual = () => {
   return (
      <>
         <section className="main-banner-sec">
            <Swiper
               pagination={true} modules={[Pagination]} className="mySwiper"
            >
               <SwiperSlide>
                  <img src='/media/img/mainBanner1.jpg' alt='' />
               </SwiperSlide>
               <SwiperSlide>
                  <img src='/media/img/mainBanner1.jpg' alt='' />
               </SwiperSlide>
               <SwiperSlide>
                  <img src='/media/img/mainBanner1.jpg' alt='' />
               </SwiperSlide>
            </Swiper>
         </section>
      </>
   )
}
export default MainVisual;