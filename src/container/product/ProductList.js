"use client";
import { useEffect, useState } from "react";
import product, {
  productItem,
  productItemCount,
} from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import style from "./ProductList.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productItem());
    dispatch(productItemCount());
  }, [dispatch]);

  const productList = useSelector((state) => {
    return state.product.data;
  });

  // console.log(productList);

  const [likeIcon, setLikeIcon] = useState(false);

  return (
    <div className={`maxframe ${style.ProductList}`}>
      <ul>
        {productList &&
          productList.map((data, index) => {
            return (
              <li key={data.pid} className={style.card}>
                <Link href={`product/detail/${data.pid}`}>
                  <div className={style.img_box}>
                    <figure>
                      <img src={data.imageUrl} />
                    </figure>
                    <p className={style.like_btn}>
                      {data.like === false ? <FaRegHeart /> : <FaHeart />}
                    </p>
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
