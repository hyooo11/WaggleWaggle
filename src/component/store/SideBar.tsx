"use client";
import SearchArea from "./SearchArea";
import StoreList from "./StoreList";
import Pagination from "./Pagination";
import { useAppSelector } from "@/redux/hook";
import { useState } from "react";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const pagination = useAppSelector((state) => state.store.pagination);
  const [page, setPage] = useState(1);

  return (
    <div className={styles.SideBar}>
      <SearchArea currentPage={page} setPage={setPage} />
      <StoreList />
      <Pagination
        totalItems={pagination?.totalCount}
        itemCountPerPage={pagination?.perPage}
        pageCount={5}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
};

export default SideBar;
