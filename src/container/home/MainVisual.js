"use client";
import { MainSwiper } from "@/ui/Swiper";

const bannerImgs = [
  "/media/img/mainBanner5.jpg",
  "/media/img/mainBanner1.jpg",
  "/media/img/mainBanner2.jpg",
  "/media/img/mainBanner3.jpg",
  "/media/img/mainBanner4.jpg",
];

const MainVisual = () => {
  return (
    <>
      <section className="main-banner-sec">
        <MainSwiper bannerImgs={bannerImgs} />
      </section>
    </>
  );
};
export default MainVisual;
