"use client";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productSlice } from "../../store/productSlice";

const Product = () => {
  // console.log(dispatch(productSlice()));
  return (
    <div className="maxframe sub_p_wrap">
      <div className="sub_p_title">
        <h2 className="">PRODUCT</h2>
        <span>상품리스트</span>
      </div>
      <div className="Product"></div>
    </div>
  );
};

export default Product;
