"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SearchFilter from "../container/product/SearchFilter";
import ProductList from "../container/product/ProductList";
import Pagination from "../ui/Pagination";
import { TbFilterPlus, TbFilterMinus } from "react-icons/tb";

const Product = ({ productList, productCount }) => {
  const router = useRouter();
  const [filterToggle, setfilterToggle] = useState(false);
  const [queryState, setQueryState] = useState();

  const removeNullUndefinedValues = (obj) => {
    const cleanedObject = {};
    for (const key in obj) {
      const value = obj[key];
      if (obj[key] !== null && obj[key] !== undefined && value.length !== 0) {
        cleanedObject[key] = obj[key];
      }
    }
    return cleanedObject;
  };

  const setSearchData = (searchData) => {
    const cleanedSearchData = removeNullUndefinedValues(searchData);
    const payloadString = Object.entries(cleanedSearchData)
      .map((e) => e.join("="))
      .join("&");
    router.push(`product?page=1&${payloadString}`);
    setQueryState(cleanedSearchData);
  };

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
      <p className="maxframe">{`총 ${productCount}개의 상품이 있습니다.`}</p>
      <div className="Product">
        {filterToggle ? <SearchFilter setSearchData={setSearchData} /> : null}

        <ProductList productList={productList} />

        <Pagination
          totalItems={productCount}
          currentPage={parseInt(currentPage)}
          pageCount={5}
          itemCountPerPage={20}
          queryState={queryState}
        />
      </div>
    </div>
  );
};

export default Product;
