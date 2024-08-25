"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import {
  setLocation,
  setResults,
  setPagination,
  setMapCoords,
} from "@/redux/features/storeSlice";
import { CityData } from "@/constants/CityData";
import { useState, useEffect } from "react";
import SelectBox from "@/ui/SelectBox";
import { useGeoLocation } from "@/hook/useGeolocation";
import Button from "@/ui/Button";
import styles from "./SearchArea.module.css";

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
const SearchArea = ({ currentPage, setPage }) => {
  const region = useAppSelector((state) => state.store.region);
  const dispatch = useAppDispatch();
  const { location, error } = useGeoLocation(geolocationOptions);
  const [city, setCity] = useState("");
  const [subArea, setSubArea] = useState("");
  const [districts, setDistricts] = useState([]);
  const { kakao } = window;

  //키워드 검색요청 함수
  const searchKeyword = (keyword) => {
    kakao.maps.load(() => {
      // 장소 검색 객체를 생성
      const place = new kakao.maps.services.Places();
      place.keywordSearch(
        `${keyword} 와인샵`,
        searchKeywordCallback,
        searchKeywordOption
      );
    });
  };
  //키워드 검색 걸과 함수
  const searchKeywordCallback = (result: any, status: any, pagination: any) => {
    if (status === kakao.maps.services.Status.OK) {
      dispatch(setResults(result));
      dispatch(setPagination(pagination));
      dispatch(setMapCoords({ x: result[0].x, y: result[0].y }));
    }
  };
  //키워드 검색 옵션 객체
  const searchKeywordOption = {
    size: 10,
    page: currentPage,
  };

  //카카오 좌표 주소변환
  const transAddress = (latitude, longitude) => {
    kakao.maps.load(() => {
      // 좌표계 변환 객체 생성
      const geocoder = new kakao.maps.services.Geocoder();
      const current = new kakao.maps.LatLng(latitude, longitude);
      geocoder.coord2Address(current.getLng(), current.getLat(), soduguName);
    });
  };
  //좌표를 주소로 변환 결과 함수
  const soduguName = (result: any, status: any) => {
    if (status === kakao.maps.services.Status.OK) {
      const sido = result[0].address.region_1depth_name;
      const gungu = result[0].address.region_2depth_name;
      dispatch(setLocation(`${sido} ${gungu}`));
    }
  };

  //페이지 초기 진입시 위치 허용하면 내위치 주변 와인샵 검색
  const locationSearch = () => {
    setPage(1);
    if (location) {
      transAddress(location.latitude, location.longitude);
      searchKeyword(region);
    } else if (error) {
      alert(
        "현재 위치를 찾을 수 없습니다. 브라우저에서 GPS 기능을 허용해주세요."
      );
    }
  };
  useEffect(() => {
    locationSearch();
    setPage(1);
  }, [location]);

  useEffect(() => {
    if (region) {
      searchKeyword(region);
    }
  }, [region, currentPage]);

  // 시도 셀렉트
  const cityChangehandle = (target: string) => {
    setCity(target);
    setDistricts(CityData[target]?.subArea || []);
    setSubArea("");
  };
  // 구군 셀렉트
  const subAreaChangehandle = (target: string) => {
    if (kakao.maps!) {
      setSubArea(target);
    }
  };
  const searchHandle = () => {
    setPage(1);
    dispatch(setLocation(`${city} ${subArea}`));
  };
  return (
    <div className={styles.SearchArea}>
      <div className={styles.select_box_wrap}>
        <SelectBox
          options={Object.keys(CityData)}
          onChange={cityChangehandle}
          selectedValue={city}
          placeholder="도/시 선택"
        />
        <SelectBox
          options={districts}
          onChange={subAreaChangehandle}
          selectedValue={subArea}
          placeholder="구/군 선택"
          disabled={!city}
        />
      </div>
      <div className={styles.btn_wrap}>
        <Button text={"검색"} type={"positive"} onClick={searchHandle} />
        <Button
          text={"내 주변 매장 검색"}
          type={"default"}
          onClick={locationSearch}
        />
      </div>
    </div>
  );
};

export default SearchArea;
