"use client";
import Link from "next/link";
import axios from "axios";
import style from "./ProductList.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getCookie } from "cookies-next";
import { useAppSelector } from "@/redux/hook";

const ProductList = ({ productList }) => {
  const user = useAppSelector((state) => state.user);
  const likeToggle = async (data) => {
    const userPid = getCookie("pid");
    if (user.isLogin === true) {
      await axios
        .post(
          "/api/product/wine/like",
          {
            memberPid: userPid,
            winePid: data,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          if (response.data.data.action === "registered") {
            alert("좋아하는 상품 등록");
          } else if (response.data.data.action === "delete") {
            alert("좋아하는 상품 삭제");
          }

          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("로그인이 필요한 기능입니다 :)");
    }
  };

  return (
    <div className={`maxframe ${style.ProductList}`}>
      <ul>
        {productList &&
          productList.map((data, index) => {
            return (
              <li key={data.pid} className={style.card}>
                <p
                  className={style.like_btn}
                  onClick={() => {
                    likeToggle(data.pid);
                  }}
                >
                  {data.like === false ? <FaRegHeart /> : <FaHeart />}
                </p>
                <Link
                  href={`product/detail/${data.pid}`}
                  title="상세페이지로 이동"
                >
                  <div className={style.img_box}>
                    <figure>
                      <img
                        src={data.imageUrl}
                        alt={`${data.korName}의 이미지`}
                      />
                    </figure>
                  </div>
                  <div className={style.title}>
                    <div className={style.kor_name}>{data.korName}</div>
                    <p className={style.eng_name}>{data.engName}</p>
                    <span className={style.desc}>{data.desc}</span>
                  </div>
                  <div className={style.hash_tag}>
                    <span>해시태그</span>
                    <span>해시태그</span>
                    <span>해시태그</span>
                  </div>
                  <div className={style.price}>{data.price}</div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ProductList;
