"use client";
import { useAppSelector } from "@/redux/hook";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

const MapField = () => {
  const storeList = useAppSelector((state) => state.store.storeData);
  const mapRef = useRef<HTMLDivElement>(null);

  const createMap = (lat: string, lng: string) => {
    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(lat, lng),
      zoom: 11,
    });

    storeList?.forEach((place) => {
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(place.y, place.x),
        map: map,
        title: place.place_name,
      });
    });
  };
  useEffect(() => {
    storeList && createMap(storeList[0].y, storeList[0].x);
  }, [storeList]);

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default MapField;
