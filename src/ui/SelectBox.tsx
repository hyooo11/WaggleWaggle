"use client";

import { useState, useRef, useEffect } from "react";
import styled from "./SelectBox.module.css";

const SelectBox = ({ options, onChange }) => {
  const [isOn, setIsOn] = useState(false);
  const [text, setText] = useState("도/시 선택");

  const selectBoxRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOn((prev) => !prev);
  };

  const handleSelect = (text: string, value: string) => {
    setText(text);
    onChange(value);
    setIsOn(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectBoxRef.current &&
      !selectBoxRef.current.contains(event.target as Node)
    ) {
      setIsOn(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styled.SelectBox}>
      <div className={`${styled.select_option} ${isOn && styled.on}`}>
        <div onClick={toggleDropdown}>{text}</div>
      </div>
      <div className={`${styled.option_box} ${isOn && styled.on}`}>
        {options.map((data, index) => {
          return (
            <div
              onClick={() => handleSelect(data.name, data.name)}
              className={styled.option}
              key={index}
            >
              {data.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectBox;
