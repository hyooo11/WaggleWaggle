"use client";
import { useEffect, useState } from "react";
import style from "./productDetail.module.css";

const ProductDetail = ({ productDetail }) => {
  console.log(productDetail);
  const [snackList, setSnackList] = useState([]);

  useEffect(() => {
    if (productDetail !== undefined) {
      setSnackList(productDetail.recommendedSnack.split(" / "));
    }
  }, [productDetail]);

  console.log(snackList);

  return (
    <div className="maxframe sub_p_wrap">
      <>
        {productDetail && (
          <section className={style.sec_1}>
            <div className={style.thumnail}>
              <figure>
                <img src={productDetail.imageUrl} />
              </figure>
            </div>
            <div className={style.main_txt_box}>
              <h3>{productDetail.korName}</h3>
              <span>{productDetail.engName}</span>
              <div className={style.snack_icon_wrap}>
                {snackList.map((data, index) => {
                  return (
                    <>
                      {data !== "null" ? (
                        <span>
                          <img src={`/media/icon/${data}.PNG`} />
                        </span>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </>
    </div>
  );
};

export default ProductDetail;
