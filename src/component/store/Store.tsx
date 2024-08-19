import SideBar from "./SideBar";
import MapField from "./MapField";
import styled from "./Store.module.css";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const Store = () => {
  return (
    <div className="maxframe sub_p_wrap">
      <div className="sub_p_title">
        <h2 className="">Store</h2>
        <span>지역별/내 주변 와인샵 검색하기</span>
      </div>
      <div className={styled.Store}>
        <SideBar />
        <div className={styled.MapWarp}>
          <MapField />
        </div>
      </div>
    </div>
  );
};

export default Store;
