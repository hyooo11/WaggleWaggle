"use client";
import { useState, useRef, useEffect } from "react";
import styled from "./SelectBox.module.css";

interface Props {
  options: string[];
  onChange: (target: string) => void;
  selectedValue: string;
  disabled?: boolean;
  placeholder: string;
}

const SelectBox = ({
  options,
  onChange,
  selectedValue,
  placeholder,
  disabled,
}: Props) => {
  const [isOn, setIsOn] = useState(false);
  const selectBoxRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOn((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    // setText(text);
    onChange(option);
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
    <div className={styled.SelectBox} ref={selectBoxRef}>
      <div className={`${styled.select_option} ${isOn && styled.on}`}>
        <div onClick={toggleDropdown}>{selectedValue || placeholder}</div>
      </div>
      <div className={`${styled.option_box} ${isOn && styled.on}`}>
        {options.map((data, _) => {
          return (
            <div
              onClick={() => handleSelect(data)}
              className={styled.option}
              key={data}
            >
              {data}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectBox;
