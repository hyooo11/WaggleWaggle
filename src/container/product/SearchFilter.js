"use client";

import { TextCheckBox } from "../../component/ui/CheckBox";
import style from "./SearchFilter.module.css";
import { productList, productItemCount } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../component/ui/Button";

const fillterList = {
  type: ["레드", "화이트", "로제", "스파클링", "주정강화", "디저트"],
  tastyNum: [1, 2, 3, 4, 5],
};

const SearchFilter = () => {
  // 체크박스 상태를 관리할 배열
  const [checkboxState, setCheckboxState] = useState([]);

  // 체크박스 상태 업데이트 함수
  const handleCheckboxChange = (value) => {
    // 이미 배열에 포함되어 있는지 확인
    const isChecked = checkboxState.includes(value);

    // 체크박스가 체크되어 있으면 배열에서 제거, 아니면 추가
    if (isChecked) {
      setCheckboxState(checkboxState.filter((item) => item !== value));
    } else {
      setCheckboxState([...checkboxState, value]);
    }
  };
  useEffect(() => {
    console.log(checkboxState);
  }, [checkboxState]);

  return (
    <div className={style.SearchFilter}>
      <div className="maxframe">
        <div>
          <div className={style.tit}>와인종류</div>
          <div className={style.fillter_box}>
            {fillterList.type.map((data, index) => {
              return (
                <TextCheckBox
                  text={data}
                  key={index}
                  inputId={`type${index}`}
                  inputName={`type${index}`}
                  checked={checkboxState.includes(data)}
                  onChange={() => handleCheckboxChange(data)}
                />
              );
            })}
          </div>
        </div>

        <div>
          <div className={style.tit}>맛</div>
          <div className={style.fillter_box}>
            <p>바디감</p>
            {fillterList.tastyNum.map((data, index) => {
              return (
                <TextCheckBox
                  text={index + 1}
                  key={index}
                  inputId={`tasty${index}`}
                  inputName={`tasty${index}`}
                />
              );
            })}
          </div>
        </div>
        <div className="btn-area">
          <Button text={"초기화"} />
          <Button text={"검색"} type={"positive"} />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
