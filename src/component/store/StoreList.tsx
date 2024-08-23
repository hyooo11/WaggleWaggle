"use client";
import { useAppSelector } from "@/redux/hook";

import styles from "./StoreList.module.css";

const StoreList = () => {
  const pagination = useAppSelector((state) => state.store.pagination);
  const searchList = useAppSelector((state) => state.store.storeData);
  const markers = useAppSelector((state) => state.store.markers);
  const infoWindows = useAppSelector((state) => state.store.infoWindows);

  //리스크 클릭시 해당하는 지도 마커 중심 위치로 이동
  const storeListHandle = (id: string) => {
    const marker = markers[id];
    const infoWindow = infoWindows[id];

    if (infoWindow.getMap()) {
      infoWindow.close();
    } else {
      infoWindow.open(marker.getMap(), marker);
      marker.getMap().panTo(marker.position);
    }
  };

  return (
    <div className={styles.StoreList}>
      <div className={styles.searchList}>
        {pagination && (
          <div className={styles.search_count}>
            검색결과 <span>{pagination.totalCount}</span> 개
          </div>
        )}

        <ul className={styles.search_list}>
          {searchList &&
            searchList.map((data, index) => {
              return (
                <li key={data.id} onClick={() => storeListHandle(data.id)}>
                  <p className={styles.name}>{data.place_name}</p>
                  <p className={styles.address}>{data.address_name}</p>
                  <p className={styles.phone}>{data.phone}</p>
                  {/* <p className={styles.url}>{data.place_url}</p> */}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default StoreList;
