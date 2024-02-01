"use client";
import { useEffect, useState } from "react";
import { getProductDetail } from "@/api/productAPI";
import ProductDetail from "@/component/product/ProductDetail";

const ProductDetailPage = (props) => {
  const [productDetail, setProductDetail] = useState();
  const winePid = props.params.id;
  useEffect(() => {
    getProductDetail(winePid).then((response) => {
      setProductDetail(response.data.data);
    });
  }, [winePid]);

  return (
    <div>
      <ProductDetail productDetail={productDetail} />
    </div>
  );
};

export default ProductDetailPage;
