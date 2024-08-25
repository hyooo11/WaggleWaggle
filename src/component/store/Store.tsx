"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import StoreList from "./StoreList";
import Pagination from "./Pagination";
import { useAppSelector } from "@/redux/hook";
import styled from "./Store.module.css";
import Script from "next/script";
const MapField = dynamic(() => import("./MapField"), {
  ssr: false,
});
const SearchArea = dynamic(() => import("./SearchArea"), {
  ssr: false,
});

const Store = () => {
  const pagination = useAppSelector((state) => state.store.pagination);
  const [page, setPage] = useState(1);
  return (
    <div className="maxframe sub_p_wrap">
      <Script
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        strategy="beforeInteractive"
      />
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services`}
        strategy="beforeInteractive"
      />
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
