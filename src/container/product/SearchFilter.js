"use client";
import { TextCheckBox } from "../../ui/CheckBox";
import style from "./SearchFilter.module.css";
import { useState } from "react";
import Button from "../../ui/Button";
import { winetype, tastyscore, country } from "./SearchFiterList";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchFilter = ({ setSearchData }) => {
  const [wineType, setWineType] = useState([]);
  const [body, setBody] = useState([]);
  const [sweet, setSweet] = useState([]);
  const [acidity, setAcidity] = useState([]);
  const [tannin, setTannin] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchData({
      type: wineType,
      body: body,
      sweet: sweet,
      acidity: acidity,
      tannin: tannin,
      country: countryList,
      maxPrice: priceRange[1],
      minPrice: priceRange[0],
    });
  };

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
                  inputId={`type${index}`}
                  inputName={data}
                  setStateList={setWineType}
                  stateList={wineType}
                  value={index + 1}
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
                  setStateList={setBody}
                  stateList={body}
                  value={index + 1}
                />
              );
            })}
          </div>
          <div className={style.fillter_box}>
            <p>당도</p>
            {tastyscore.map((data, index) => {
              return (
                <TextCheckBox
                  text={index + 1}
                  key={index}
                  inputId={`sweet${index}`}
                  inputName={`sweet${index}`}
                  setStateList={setSweet}
                  stateList={sweet}
                  value={index + 1}
                />
              );
            })}
          </div>
          <div className={style.fillter_box}>
            <p>산미</p>
            {tastyscore.map((data, index) => {
              return (
                <TextCheckBox
                  text={index + 1}
                  key={index}
                  inputId={`acidity${index}`}
                  inputName={`acidity${index}`}
                  setStateList={setAcidity}
                  stateList={acidity}
                  value={index + 1}
                />
              );
            })}
          </div>
          <div className={style.fillter_box}>
            <p>탄닌</p>
            {tastyscore.map((data, index) => {
              return (
                <TextCheckBox
                  text={index + 1}
                  key={index}
                  inputId={`tannin${index}`}
                  inputName={`tannin${index}`}
                  setStateList={setTannin}
                  stateList={tannin}
                  value={index + 1}
                />
              );
            })}
          </div>
          <div>
            <div className={style.tit}>생산국가</div>
            <div className={style.fillter_box}>
              {country.map((data, index) => {
                return (
                  <TextCheckBox
                    text={data}
                    key={index}
                    inputId={`country${index}`}
                    inputName={data}
                    setStateList={setCountryList}
                    stateList={countryList}
                    value={index + 1}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <div className={style.tit}>가격범위</div>
            <Slider
              range
              className="rc-slider"
              min={0}
              max={100000}
              step={10000}
              defaultValue={[0, 100000]}
              dots={true}
              value={priceRange}
              onChange={(e) => {
                setPriceRange(e);
              }}
            />
            <p>
              Selected Price Range: {priceRange[0]}원 - {priceRange[1]}원
            </p>
          </div>
        </div>
        <div className="btn-area">
          {/* <Button text={"초기화"} /> */}
          <Button text={"검색"} type={"positive"} onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
