"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useAppSelector, useAppDispatch } from "../../redux/hook";
import {
  productItem,
  productItemCount,
} from "../../redux/features/productSlice";
import Product from "../../component/product/Product";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const productCount = useAppSelector((state) => state.product.searchCount);
  const productList = useAppSelector((state) => state.product.data);
  const [queryState, setQueryState] = useState([]);

  const query = useSearchParams();
  //상품리스트 파라미터
  useEffect(() => {
    const params = window.location.search;
    if (params.length > 0) {
      dispatch(productItem(params));
    }
  }, [query]);

  //상품 갯수 파라미터
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("page")) {
      searchParams.delete("page");
      const countParams = searchParams.toString();
      dispatch(productItemCount(countParams));
      setQueryState(countParams);
    }
  }, [query]);

  return (
    <div>
      <Product
        productCount={productCount}
        productList={productList}
        queryState={queryState}
      />
    </div>
  );
};

export default ProductPage;
