"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import styled from "./BestReview.module.css";
import Modal from "../../component/ui/Modal";

const BestReview = () => {
  const [bestReview, setBestReview] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [modalIndex, setModalIndex] = useState("");
  const closeModal = () => setModalState(false);
  const fetchData = async () => {
    try {
      const result = await axios.get("api/community/best-review");
      let copy = [result.data.data];
      setBestReview(copy[0]);
      // console.log('베스트 리뷰 데이터 가져오기 성공');
    } catch (error) {
      console.log("베스트 리뷰 데이터 가져오기 실패");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // console.log(bestReview)
  return (
    <>
      <section className={styled.reviewSec}>
        <div className="maxframe">
          <div className="title-sec">
            <h4>와구 베스트 리뷰</h4>
            <span>WAGU BEST REVIEW</span>
          </div>
          <div>
            <ul className={styled.reviewList}>
              {bestReview.map((data, index) => (
                <li
                  id={index}
                  key={index}
                  onClick={() => {
                    setModalState(true), setModalIndex(index);
                  }}
                >
                  <figure>
                    <img src={data.reviewImg1} alt="" />
                  </figure>
                  <div className={styled.txtBox}>
                    <p className={styled.title}>{data.reviewTitle}</p>
                    <span className={styled.desc}>{data.desc}</span>
                    <span>{data.writerNick}</span>
                    <span>{data.regiDate}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {modalState && (
          <Modal closeModal={closeModal}>
            <span>{bestReview[modalIndex].writerNick}</span>
            <figure>
              <img src={bestReview[modalIndex].reviewImg1} alt="" />
            </figure>
            <p>{bestReview[modalIndex].reviewTitle}</p>
          </Modal>
        )}
      </section>
    </>
  );
};
export default BestReview;
