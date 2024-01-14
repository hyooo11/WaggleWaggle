"use client";
import { useEffect, useState } from "react";
import { productItem, productItemCount } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import style from "./ProductList.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import LocalStorage from "../../util/localstorage";

const ProductList = () => {
  const [selectWine, setSelectWine] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productItem());
    dispatch(productItemCount());
  }, [dispatch]);

  const productList = useSelector((state) => {
    return state.product.data;
  });

  const likeToggle = async () => {
    const userPid = LocalStorage.getItem("pid");
    await axios
      .post(
        "/api/product/wine/like",
        {
          memberPid: userPid,
          winePid: selectWine,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   likeToggle();
  // }, [selectWine, productList]);

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
                    setSelectWine(data.pid);
                  }}
                >
                  {data.like === false ? <FaRegHeart /> : <FaHeart />}
                </p>
                <Link href={`product/detail/${data.pid}`}>
                  <div className={style.img_box}>
                    <figure>
                      <img src={data.imageUrl} />
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
