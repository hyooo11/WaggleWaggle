"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { setCoord, setLocation, setResults } from "@/redux/features/storeSlice";
import { useEffect, useState } from "react";
import styles from "./StoreList.module.css";
import SelectBox from "@/ui/SelectBox";
import { CityData } from "@/constants/SityData";
import { useGeoLocation } from "@/hook/useGeolocation";

declare global {
  interface Window {
    kakao: any;
  }
}

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const StoreList = () => {
  const { location, error } = useGeoLocation(geolocationOptions);
  const [gungu, setGungu] = useState<{ name: string }[]>();
  const region = useAppSelector((state) => state.store.region);
  const state = useAppSelector((state) => state.store);
  const pagination = useAppSelector(
    (state) => state.store.storeData?.pagination
  );
  const coord = useAppSelector((state) => state.store.coord);
  const searchList = useAppSelector((state) => state.store.storeData?.result);
  const dispatch = useAppDispatch();

  console.log(state);
  //키워드 검색요청 함수
  const searchKeyword = (keyword) => {
    window.kakao.maps.load(() => {
      // 장소 검색 객체를 생성
      const place = new window.kakao.maps.services.Places();
      place.keywordSearch(
        `${keyword} 와인샵`,
        searchKeywordCallback,
        searchKeywordOption
      );
    });
  };
  //키워드 검색 걸과 함수
  const searchKeywordCallback = (result: any, status: any, pagination: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const results = { result: result, pagination: pagination };
      dispatch(setResults(results));
    }
  };
  //키워드 검색 옵션 객체
  const searchKeywordOption = {
    size: 10,
    page: 1,
  };

  //카카오 좌표 주소변환
  const transAddress = (latitude, longitude) => {
    window.kakao.maps.load(() => {
      // 좌표계 변환 객체 생성
      const geocoder = new window.kakao.maps.services.Geocoder();
      const current = new window.kakao.maps.LatLng(latitude, longitude);
      geocoder.coord2Address(current.getLng(), current.getLat(), soduguName);
    });
  };
  //좌표를 주소로 변환 결과 함수
  const soduguName = (result: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const sido = result[0].address.region_1depth_name;
      const gungu = result[0].address.region_2depth_name;
      dispatch(setLocation(`${sido} ${gungu}`));
    }
  };
  //카카오 주소를 좌표로 변환
  const transCoord = () => {
    // 좌표계 변환 객체 생성
    const geocoder = new window.kakao.maps.services.Geocoder();
    window.kakao.maps.load(() => {
      geocoder.addressSearch(region, soduguGeo);
    });
  };

  //주소를 좌표료 변환 결과 함수
  const soduguGeo = (result: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const x = result[0].x;
      const y = result[0].y;
      dispatch(setCoord({ latitude: x, longitude: y }));
    }
  };

  useEffect(() => {
    //페이지 초기 진입시 위치 허용하면 내위치 주변 와인샵 검색
    if (location) {
      dispatch(
        setCoord({
          latitude: location.latitude,
          longitude: location.longitude,
        })
      );
      transAddress(location.latitude, location.longitude);
      searchKeyword(region);
    }
  }, [location]);

  useEffect(() => {
    if (region) {
      searchKeyword(region);
    }
  }, [region]);

  // 시도 셀렉트
  const sidoChangehandle = (target: string) => {
    const sido = CityData.find((city) => city.name === target);
    if (sido) {
      setGungu(sido.subArea);
    }
    console.log(target);
  };
  // 구군 셀렉트
  const gugunChangehandle = (target: string) => {
    console.log(target);
  };

  return (
    <div className={styles.StoreList}>
      <div>
        <div style={{ display: "flex" }}>
          <SelectBox options={CityData} onChange={sidoChangehandle} />
          {gungu && <SelectBox options={gungu} onChange={gugunChangehandle} />}
        </div>
        <button>검색</button>
      </div>
      <div className={styles.searchList}>
        <div>{`검색결과: ${pagination?.totalCount} 개`}</div>
        {searchList?.map((data, index) => {
          return <div key={data.id}>{data.address_name}</div>;
        })}
      </div>
    </div>
  );
};

export default StoreList;
