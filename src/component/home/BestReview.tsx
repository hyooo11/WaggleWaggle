"use client";
import { getBestReview } from "@/api/homeAPI";
import { useState, useEffect } from "react";
import styled from "./BestReview.module.css";
import Modal from "@/ui/Modal";
import StarRatings from "react-star-ratings";
import { FaWineBottle } from "react-icons/fa";
import Image from "next/image";

interface BestReviewType {
  reviewId: number;
  reviewTitle: string;
  wineName: string;
  desc: string;
  writerId: number;
  regiDate: string;
  starPoint: number;
  reviewImg1: string;
  writerNick: string;
}

const BestReview = () => {
  const [bestReview, setBestReview] = useState<BestReviewType[]>();
  const [modalState, setModalState] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const closeModal = () => setModalState(false);

  useEffect(() => {
    getBestReview().then((response) => {
      setBestReview(response.data.data);
    });
  }, []);

  const modalHandler = (index: number) => {
    setModalState(!modalState);
    setModalIndex(index);
  };

  return (
    <section className={styled.BestReview}>
      <div className="maxframe">
        <div className="title-sec">
          <h4>와글와글 베스트 리뷰</h4>
          <span>Waggle Waggle Best Review</span>
        </div>
        <div>
          <ul className={styled.reviewList}>
            {bestReview &&
              bestReview.map((data, index) => (
                <li key={index} onClick={() => modalHandler(index)}>
                  <figure>
                    <Image
                      src={data.reviewImg1}
                      alt="리뷰이미지"
                      width={100}
                      height={100}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8Xw8AAmMBcHOnfc4AAAAASUVORK5CYII="
                    />
                  </figure>
                  <div className={styled.txtBox}>
                    <span className={styled.writerNick}>
                      {data.writerNick}님의 리뷰
                    </span>
                    <span className={styled.title}>{data.reviewTitle}</span>
                    <span className={styled.desc}>{data.desc}</span>
                    <span className={styled.date}>
                      {data.regiDate.slice(0, 10)}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      {modalState && (
        <Modal closeModal={closeModal}>
          {bestReview && (
            <div className={styled.modal_inner}>
              <div className={styled.writer_info}>
                <span>{bestReview[modalIndex].writerNick}</span>
                <span>{bestReview[modalIndex].regiDate.slice(0, 10)}</span>
              </div>
              <figure>
                <img src={bestReview[modalIndex].reviewImg1} alt="" />
              </figure>
              <div className={styled.txt_box}>
                <p>{bestReview[modalIndex].reviewTitle}</p>
                <p>{bestReview[modalIndex].desc}</p>
              </div>
              <div className={styled.wine_info}>
                <p>
                  <FaWineBottle />
                </p>
                <p>{bestReview[modalIndex].wineName}</p>
                <p>
                  <StarRatings
                    rating={bestReview[modalIndex].starPoint}
                    starRatedColor="rgb(255, 224, 140)"
                    starEmptyColor="rgb(234, 234, 234)"
                    starDimension="20px"
                    starSpacing="0px"
                  />
                </p>
              </div>
            </div>
          )}
        </Modal>
      )}
    </section>
  );
};
export default BestReview;
