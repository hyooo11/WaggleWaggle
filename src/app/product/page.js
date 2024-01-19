"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { productItem } from "../../store/productSlice";
import SearchFilter from "../../container/product/SearchFilter";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../container/product/ProductList";
import Pagination from "../../component/ui/Pagination";
import { TbFilterPlus, TbFilterMinus } from "react-icons/tb";

const Product = () => {
  // const [searchData, setSearchData] = useState([]);
  // useEffect(() => {
  //   console.log(searchData);
  // }, [searchData]);
  const router = useRouter();
  // console.log(router);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [totalItems, setTotalItems] = useState();
  const dispatch = useDispatch();

  const queryParams = [
    "page",
    "type",
    "body",
    "sweet",
    "acidity",
    "tannin",
    "country",
    "maxPrice",
    "minPrice",
  ];

  // const params = () => {
  //   SearchFilter.filter;
  // };

  // console.log(setSearchData);

  const page = searchParams.get("page");
  const type = searchParams.get("type");
  const body = searchParams.get("body");
  const sweet = searchParams.get("sweet");
  const acidity = searchParams.get("acidity");
  const tannin = searchParams.get("tannin");
  const country = searchParams.get("country");
  const maxPrice = searchParams.get("maxPrice");
  const minPrice = searchParams.get("minPrice");

  const productCount = useSelector((state) => {
    return state.product.searchCount;
  });

  const setSearchData = (searchData) => {
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
    const cleanedSearchData = removeNullUndefinedValues(searchData);

    if (searchData) {
      router.push(`product?page=1&${JSON.stringify(cleanedSearchData)}`);
    }
  };

  useEffect(() => {
    dispatch(productItem({ page, type, body, sweet }));
  }, [page, type, body, sweet, dispatch]);

  useEffect(() => {
    setTotalItems(productCount);
  }, [productCount, setSearchData]);

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
      <p className="maxframe">{`총 ${totalItems}개의 상품이 있습니다.`}</p>
      <div className="Product">
        {filterToggle ? <SearchFilter setSearchData={setSearchData} /> : null}

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
