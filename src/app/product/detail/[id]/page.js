"use client";
import { useEffect, useState } from "react";
import { getProductDetail } from "@/api/productAPI";
import ProductDetail from "@/component/product/ProductDetail";

const ProductDetailPage = (props) => {
  const winePid = props.params.id;
  const [productDetail, setProductDetail] = useState();
  useEffect(() => {
    getProductDetail(winePid).then((response) => {
      setProductDetail(response.data.data);
    });
  }, []);

  return (
    <div>
      <ProductDetail productDetail={productDetail} />
    </div>
  );
};

export default ProductDetailPage;
