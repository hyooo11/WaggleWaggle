import Link from "next/link";
import style from "./ReviewList.module.css";
import { FaRegHeart } from "react-icons/fa";

const ReviewList = ({ renderList }) => {
  return (
    <div className={style.ReviewList}>
      <ul className={style.review_wrap}>
        {renderList &&
          renderList.map((data, index) => {
            return (
              <li key={data.reviewId} className={style.review_card}>
                <Link href={`community/detail/${data.reviewId}`}>
                  <div className={style.user_info}>
                    <figure>
                      <img
                        src={data.writerProfileImg}
                        alt={`${data.writerNickName}님의 프로필`}
                      />
                    </figure>
                    <span>{data.writerNickName}</span>
                  </div>
                  <div className={style.review_img}>
                    <figure>
                      <img src={data.reviewImgs[0]} alt="대표이미지" />
                    </figure>
                  </div>
                  <div className={style.review_info}>
                    <div className={style.like_wrap}>
                      <span className={style.icon}>
                        <FaRegHeart />
                      </span>
                      <span>{data.reviewLike}</span>
                      <span>명이 좋아합니다.</span>
                    </div>
                    <div className={style.txt_wrap}>
                      <p className={style.tit}>{data.reviewTitle}</p>
                      <p className={style.desc}>{data.desc}</p>
                      <p className={style.date}>{data.regiDate.slice(0, 10)}</p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ReviewList;
