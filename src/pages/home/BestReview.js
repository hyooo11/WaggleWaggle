import axios from "axios";
import { useState, useEffect } from 'react'
import styled from "./BestReview.module.css";

const BestReview = () => {
  const [bestReview, setBestReview] = useState([]);
  const fetchData = async () => {
    try {
      const result = await axios.get('/api/community/best-review');
      let copy = [result.data.data];
      setBestReview(copy[0]);
    } catch (error) {
      console.log('베스트 리뷰 데이터 가져오기 실패');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
                <li id={index} key={index}>
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
      </section>
    </>
  )
}

export default BestReview;