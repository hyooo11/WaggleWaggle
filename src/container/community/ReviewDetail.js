"use client";
import style from "./ReviewDetail.module.css";
import { SwiperPerView } from "@/ui/Swiper";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";
import { postEditorHandler } from "@/api/communityAPI";
import StarRatings from "react-star-ratings";

const ReviewDetail = ({ reviewDetail, userPid }) => {
  const router = useRouter();
  const goEdit = () => {
    router.push(`/community/write/edit/${reviewDetail.reviewId}`);
  };
  const reviewDelete = () => {
    const data = { reviewId: reviewDetail.reviewId };
    postEditorHandler("DELETE", data)
      .then(router.push("/community"))
      .catch((errors) => console.log(errors));
  };

  console.log(reviewDetail);

  return (
    <div className={style.ReviewDetail}>
      {reviewDetail &&
      userPid &&
      JSON.parse(reviewDetail.writerId) === JSON.parse(userPid) ? (
        <div>
          <Button text={"수정하기"} onClick={goEdit} type={"positive"} />
          <Button text={"삭제하기"} onClick={reviewDelete} type={"default"} />
        </div>
      ) : (
        <></>
      )}
      {reviewDetail && (
        <>
          <div className={style.top_area}>
            <div
              className={style.title_wrap}
              style={{ backgroundImage: `url(${reviewDetail.reviewImgs[0]})` }}
            >
              <div className={style.bg_filter}></div>
              <h3>{reviewDetail.reviewTitle}</h3>
              <p className={style.hash_tag}>
                {reviewDetail.hashTag.map((data, index) => {
                  return <span>{data}</span>;
                })}
              </p>
              <div className={style.writer_info}>
                <figure>
                  <img
                    src={reviewDetail.writerProfileImg}
                    alt={`${reviewDetail.writerNickName}님의 프로필`}
                  />
                </figure>
                <p>{reviewDetail.writerNickName}</p>
                <p>{reviewDetail.regiDate.slice(0, 10)}</p>
              </div>
            </div>
            <div className={style.wine_info}>
              <p>
                <span>와인타입</span>
                <span>{reviewDetail.wineType}</span>
              </p>
              <p>
                <span>와인이름</span>
                <span>{reviewDetail.wineName}</span>
              </p>
              <p>
                <span>구매가격</span>
                <span>{reviewDetail.winePrice}</span>
              </p>
              <p>
                <span>별점</span>
                <span>
                  <StarRatings
                    rating={reviewDetail.starPoint}
                    starRatedColor="rgb(255 197 41)"
                    starEmptyColor="rgb(255,255,255)"
                    starDimension="20px"
                    starSpacing="0px"
                  />
                </span>
              </p>
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
