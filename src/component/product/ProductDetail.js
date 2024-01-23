import style from "./productDetail.module.css";

const ProductDetail = ({ productDetail }) => {
  console.log(productDetail);
  return (
    <div className="maxframe sub_p_wrap">
      <div>
        <div className={style.thumnail}>
          <figure>
            <img src={productDetail.imageUrl} />
          </figure>
        </div>
        <div className={style.main_txt_box}>
          <h3>{productDetail.korName}</h3>
          <span>{productDetail.engName}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
