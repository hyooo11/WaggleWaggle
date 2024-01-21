"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { productItem } from "../redux/features/productSlice";
import SearchFilter from "../container/product/SearchFilter";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../container/product/ProductList";
import Pagination from "./ui/Pagination";
import { TbFilterPlus, TbFilterMinus } from "react-icons/tb";

const Product = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [totalItems, setTotalItems] = useState();
  const dispatch = useDispatch();

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
    console.log(searchData);
    const cleanedSearchData = removeNullUndefinedValues(searchData);
    const payloadString = Object.entries(cleanedSearchData)
      .map((e) => e.join("="))
      .join("&");
    console.log(payloadString);
    router.push(`product?page=1&${payloadString}`);
  };

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
      <p className="maxframe">{`총 ${totalItems}개의 상품이 있습니다.`}</p>
      <div className="Product">
        {filterToggle ? <SearchFilter setSearchData={setSearchData} /> : null}

        <ProductList />

        <Pagination
          totalItems={totalItems}
          currentPage={1}
          pageCount={5}
          itemCountPerPage={20}
        />
      </div>
    </div>
  );
};

export default Product;
