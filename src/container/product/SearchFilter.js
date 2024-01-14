"use client";
import { TextCheckBox } from "../../component/ui/CheckBox";
import style from "./SearchFilter.module.css";
import { productList, productItemCount } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import Button from "../../component/ui/Button";
import { winetype, tastyscore, country, grape } from "./SearchFiterList";

const SearchFilter = () => {
  const [checkedList, setCheckedList] = useState([]);

  const [wintType, setWintType] = useState([]);
  const [body, setBody] = useState([]);
  const [sweet, setSweet] = useState([]);
  const [acidity, setAcidity] = useState([]);
  const [tannin, setTannin] = useState([]);
  const [country, setCountry] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  const checkedItemHandler = (value, isChecked) => {
    if (isChecked) {
      setWintType((prev) => [...prev, value]);
      setBody((prev) => [...prev, value]);
      return;
    }
    if (!isChecked && wintType.includes(value)) {
      setWintType(wintType.filter((item) => item !== value));
      setBody(body.filter((item) => item !== value));
      return;
    }
    return;
  };

  const checkHandler = (value, isChecked) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, isChecked);
    console.log(value, isChecked);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("checkedList:", wintType, body);
    },
    [wintType, body]
  );

  return (
    <div className={style.SearchFilter}>
      <div className="maxframe">
        <div>
          <div className={style.tit}>와인종류</div>
          <div className={style.fillter_box}>
            {winetype.map((data, index) => {
              return (
                <TextCheckBox
                  text={data}
                  key={index}
                  inputId={data}
                  inputName={data}
                  isChecked={wintType.includes(index + 1)}
                  onChange={(e) => checkHandler(index + 1, e.target.checked)}
                />
              );
            })}
          </div>
        </div>

        <div>
          <div className={style.tit}>맛</div>
          <div className={style.fillter_box}>
            <p>바디감</p>
            {tastyscore.map((data, index) => {
              return (
                <TextCheckBox
                  text={index + 1}
                  key={index}
                  inputId={`body${index}`}
                  inputName={`body${index}`}
                  isChecked={body.includes(index + 1)}
                  onChange={(e) => checkHandler(index + 1, e.target.checked)}
                />
              );
            })}
          </div>
        </div>
        <div className="btn-area">
          <Button text={"초기화"} />
          <Button text={"검색"} type={"positive"} onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
