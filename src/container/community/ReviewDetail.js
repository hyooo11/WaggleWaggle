"use client";
import style from "./ReviewDetail.module.css";
import { SwiperPerView } from "@/ui/Swiper";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";
import { postEditorHandler } from "@/api/communityAPI";

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

  return (
    <div className={style.ReviewDetail}>
      {reviewDetail && (
        <>
          {JSON.parse(reviewDetail.writerId) === JSON.parse(userPid) ? (
            <div>
              <Button text={"수정하기"} onClick={goEdit} type={"positive"} />
              <Button
                text={"삭제하기"}
                onClick={reviewDelete}
                type={"default"}
              />
            </div>
          ) : (
            <></>
          )}

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
