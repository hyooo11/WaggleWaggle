"use client";
import dynamic from "next/dynamic";
const MapField = dynamic(() => import("./MapField"), {
  ssr: false,
});
import styled from "./Store.module.css";
const SearchArea = dynamic(() => import("./SearchArea"), {
  ssr: false,
});
import { useState } from "react";
import StoreList from "./StoreList";
import Pagination from "./Pagination";
import { useAppSelector } from "@/redux/hook";

const Store = () => {
  const pagination = useAppSelector((state) => state.store.pagination);
  const [page, setPage] = useState(1);
  return (
    <div className="maxframe sub_p_wrap">
      <div className="sub_p_title">
        <h2 className="">Store</h2>
        <span>지역별/내 주변 와인샵 검색하기</span>
      </div>

      <SearchArea currentPage={page} setPage={setPage} />

      <div className={styled.Store}>
        <div className={styled.side_bar}>
          <StoreList />
          {pagination && (
            <Pagination
              totalItems={pagination?.totalCount}
              itemCountPerPage={pagination?.perPage}
              pageCount={5}
              currentPage={page}
              setPage={setPage}
            />
          )}
        </div>
        <div className={styled.MapWarp}>
          <MapField />
        </div>
      </div>
    </div>
  );
};

export default Store;
