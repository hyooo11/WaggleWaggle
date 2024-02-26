"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { productItem, productItemCount } from "@/redux/features/productSlice";

const Admin = () => {
  const product = useAppSelector((state) => state.product);
  const productCount = product.searchCount;

  console.log(productCount);

  return (
    <div className="Admin">
      <div className="space_a">
        <h2 className="tit">홈페이지 현황</h2>
        <div>
          <div>
            <p className="icon"></p>
            <p>
              <span>등록된 상품 갯수</span>
              <p>개</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;
