"use client";
import { useEffect, useState } from "react";
import style from "./ProductDetail.module.css";
import { DrawScore } from "@/ui/DrawScore";
import StarRatings from "react-star-ratings";

const ProductDetail = ({ productDetail }) => {
  console.log(productDetail);
  const [snackList, setSnackList] = useState([]);

  useEffect(() => {
    if (productDetail !== undefined) {
      setSnackList(productDetail.recommendedSnack.split(" / "));
    }
  }, [productDetail]);

  const windType = (data) => {
    if (data === 1) {
      return "레드";
    } else if (data === 2) {
      return "화이트";
    } else if (data === 3) {
      return "로제";
    } else if (data === 4) {
      return "스파클링";
    } else if (data === 5) {
      return "주정강화";
    } else if (data === 6) {
      return "디저트";
    }
  };

  return (
    <div className={`maxframe sub_p_wrap ${style.ProductDetail}`}>
      <div className="sub_p_title ">
        <h2 className="">PRODUCT DETAIL</h2>
        <span>상품상세페이지</span>
      </div>
      <>
        {productDetail && (
          <>
            <section className={style.sec_1}>
              <div className={style.thumnail}>
                <figure>
                  <img
                    src={productDetail.imageUrl}
                    alt={`${productDetail.korName} 썸네일`}
                  />
                </figure>
              </div>
              <div className={style.main_txt_box}>
                <h3>{productDetail.korName}</h3>
                <span className={style.eng_name}>{productDetail.engName}</span>
                <span className={style.desc}>{productDetail.desc}</span>
                <span>
                  <StarRatings
                    rating={productDetail.starPoint}
                    starRatedColor="rgb(255, 224, 140)"
                    starEmptyColor="rgb(234, 234, 234)"
                    starDimension="20px"
                    starSpacing="0px"
                  />
                </span>
                <span className={style.price}>
                  {productDetail.price.toLocaleString()} won
                </span>
                <div className={style.tasty}>
                  <p className={style.type}>
                    <span>와인종류</span>
                    <span>{windType(productDetail.type)}</span>
                  </p>
                  <p>
                    <span>바디감</span>
                    <span>{DrawScore(productDetail.body)}</span>
                  </p>
                  <p>
                    <span>당도</span>
                    <span>{DrawScore(productDetail.sweet)}</span>
                  </p>
                  <p>
                    <span>산미</span>
                    <span>{DrawScore(productDetail.acidity)}</span>
                  </p>
                  <p>
                    <span>탄닌</span>
                    <span>{DrawScore(productDetail.tannin)}</span>
                  </p>
                </div>
                <div className={style.snack_icon_wrap}>
                  <span>추천안주</span>
                  {snackList.map((data, index) => {
                    return (
                      <>
                        {data !== "null" ? (
                          <div>
                            <span>
                              <img
                                src={`/media/icon/${data.replaceAll(
                                  " ",
                                  ""
                                )}.PNG`}
                                alt={`${data} 아이콘`}
                              />
                            </span>
                            <span>{data}</span>
                          </div>
                        ) : (
                          <span>준비중입니다.</span>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            </section>
            <section className={style.sec_2}></section>
          </>
        )}
      </>
    </div>
  );
};

export default ProductDetail;
