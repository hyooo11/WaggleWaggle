"use client";
import { useEffect, useRef, useState } from "react";
import SelectBox from "@/ui/SelectBox";
import { CityData } from "@/constants/SityData";

declare global {
  interface Window {
    kakao: any;
  }
}

const Store = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [searchMapArr, serSearchMapArr] = useState([]);
  // const [sido, setSido] = useState("");
  const [gungu, setGungu] = useState<{ name: string }[]>();
  useEffect(() => {
    const searchKeywordMap = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 반환 객체를 생성
        var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        const place = new window.kakao.maps.services.Places();

        place.keywordSearch(
          "서울 강동구 와인샵",
          (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              serSearchMapArr(result);
              // console.log(result);
            }
          }
        );

        // 주소로 좌표를 검색
        // geocoder.addressSearch("상암로 251", (result: any, status: any) => {
        //   if (status === window.kakao.maps.services.Status.OK) {
        //     // 정상적으로 검색이 완료됐으면
        //     var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        //     // 지도를 생성
        //     const options = {
        //       center: coords,
        //       level: 3,
        //     };
        //     const map = new window.kakao.maps.Map(mapRef.current, options);
        //     // 결과값으로 받은 위치를 마커로 표시
        //     new window.kakao.maps.Marker({
        //       map: map,
        //       position: coords,
        //     });
        //   } else {
        //     // 정상적으로 좌표가 검색이 안 될 경우 디폴트 좌표로 검색
        //     const container = document.getElementById("map");
        //     const options = {
        //       center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        //       level: 3,
        //     };
        //     // 지도를 생성
        //     const map = new window.kakao.maps.Map(mapRef.current, options);
        //     new window.kakao.maps.Marker({
        //       map: map,
        //       position: coords,
        //     });
        //   }
        // });
      });
    };
    searchKeywordMap();
  }, []);

  const handleTypeChange = (target: string) => {
    const sido = CityData.find((city) => city.name === target);

    if (sido) {
      setGungu(sido.subArea);
    }
  };

  return (
    <div className="maxframe sub_p_wrap">
      <div className="sub_p_title">
        <h2 className="">Store</h2>
        <span>와인샵 검색하기</span>
      </div>
      <div className="Product">
        <div style={{ display: "flex" }}>
          <SelectBox options={CityData} onChange={handleTypeChange} />
          {gungu && <SelectBox options={gungu} onChange={handleTypeChange} />}
        </div>
        <div ref={mapRef} style={{ width: "500px", height: "500px" }}></div>
      </div>
    </div>
  );
};

export default Store;
