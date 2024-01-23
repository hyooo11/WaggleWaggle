"use client";
import style from "./ReviewDetail.module.css";
import { SwiperPerView } from "@/ui/Swiper";

const ReviewDetail = ({ reviewDetail }) => {
  console.log(reviewDetail);
  return (
    <div className={style.ReviewDetail}>
      {reviewDetail && (
        <>
          <div
            className={style.title_wrap}
            style={{ backgroundImage: `url(${reviewDetail.reviewImgs[0]})` }}
          >
            <div className={style.bg_filter}></div>
            <h3>{reviewDetail.reviewTitle}</h3>
            <p className={style.hash_tag}>
              <span>#해시태그</span>
              <span>#해시태그</span>
            </p>
            <div className={style.writer_info}>
              <figure>
                <img src={reviewDetail.writerProfileImg} />
              </figure>
              <p>{reviewDetail.writerNickName}</p>
              <p>{reviewDetail.regiDate.slice(0, 10)}</p>
            </div>
          </div>
          <SwiperPerView ImageArr={reviewDetail.reviewImgs} />
          <div className={style.desc}>{reviewDetail.desc}</div>
        </>
      )}
    </div>
  );
};

export default ReviewDetail;