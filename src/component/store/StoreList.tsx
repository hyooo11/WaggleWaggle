"use client";
import { useAppSelector } from "@/redux/hook";

import styles from "./StoreList.module.css";

const StoreList = () => {
  const pagination = useAppSelector((state) => state.store.pagination);
  const searchList = useAppSelector((state) => state.store.storeData);

  return (
    <div className={styles.StoreList}>
      <div className={styles.searchList}>
        <div>{`검색결과: ${pagination?.totalCount} 개`}</div>
        {searchList &&
          searchList.map((data, index) => {
            return <div key={data.id}>{data.address_name}</div>;
          })}
      </div>
    </div>
  );
};

export default StoreList;
