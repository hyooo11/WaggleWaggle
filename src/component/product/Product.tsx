"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { productItem, productItemCount } from "@/redux/features/productSlice";
import { ProductSearchType } from "@/types";
import SearchFilter from "@/container/product/SearchFilter";
import ProductList from "@/container/product/ProductList";
import Pagination from "@/ui/Pagination";
import { TbFilterPlus, TbFilterMinus } from "react-icons/tb";

const Product = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product);
  const [filterToggle, setfilterToggle] = useState<boolean>(false);
  const [queryState, setQueryState] = useState<ProductSearchType | string>();
  const query = useSearchParams();

  const productList = product.data;
  const productCount = product.searchCount;

  const removeNullUndefinedValues = (obj: ProductSearchType) => {
    const cleanedObject = {};
    for (const key in obj) {
      const value = obj[key];
      if (obj[key] !== null && obj[key] !== undefined && value.length !== 0) {
        cleanedObject[key] = obj[key];
      }
    }
    return cleanedObject;
  };

  const setSearchData = (searchData: ProductSearchType) => {
    const cleanedSearchData = removeNullUndefinedValues(searchData);
    const payloadString = Object.entries(cleanedSearchData)
      .map((e) => e.join("="))
      .join("&");
    router.push(`product?page=1&${payloadString}`);
    setQueryState(cleanedSearchData);
  };

  //상품리스트 조회
  useEffect(() => {
    const params = window.location.search;
    if (params.length > 0) {
      dispatch(productItem(params));
    }
  }, [query, dispatch]);

  //상품 갯수 조회
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("page")) {
      searchParams.delete("page");
      const countParams = searchParams.toString();

      dispatch(productItemCount(countParams));
      setQueryState(countParams);
    }
  }, [query, dispatch]);

  const currentPage = useSearchParams().get("page");

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
      <div>
        {filterToggle ? <SearchFilter setSearchData={setSearchData} /> : null}
        <ProductList productList={productList} />
        <Pagination
          totalItems={productCount}
          currentPage={currentPage && parseInt(currentPage)}
          pageCount={5}
          itemCountPerPage={20}
          queryState={queryState}
        />
      </div>
    </div>
  );
};

export default Product;
