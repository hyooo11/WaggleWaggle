"use client";

import { useState, useEffect } from "react";
import { productItem } from "../../store/productSlice";
import SearchFilter from "../../container/product/SearchFilter";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../container/product/ProductList";
import Pagination from "../../component/ui/Pagination";
import { useSearchParams } from "next/navigation";
import { TbFilterPlus, TbFilterMinus } from "react-icons/tb";

const Product = () => {
  const [totalItems, setTotalItems] = useState();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state.product.searchCount;
  });

  useEffect(() => {
    setTotalItems(state);
  }, [state]);

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    dispatch(productItem(page));
  }, [page]);

  // console.log(page);

  const [filterToggle, setfilterToggle] = useState(false);
  return (
    <div className=" sub_p_wrap">
      <div className="sub_p_title maxframe">
        <h2 className="">PRODUCT</h2>
        <span>상품리스트</span>
        <button
          className="filter_btn"
          onClick={() => {
            filterToggle ? setfilterToggle(false) : setfilterToggle(true);
          }}
        >
          {filterToggle ? <TbFilterMinus /> : <TbFilterPlus />}
        </button>
      </div>

      <div className="Product">
        {filterToggle ? <SearchFilter /> : null}

        <ProductList />

        <Pagination
          totalItems={totalItems}
          currentPage={page ? parseInt(page) : 1}
          pageCount={5}
          itemCountPerPage={20}
        />
      </div>
    </div>
  );
};

export default Product;
