import style from "./CheckBox.module.css";

const CheckBox = ({ text, inputId, inputName }) => {
  return (
    <div className={style.CheckBox}>
      <input type="checkbox" id={inputId} name={inputName} />
      <label htmlFor={inputId}>{text}</label>
    </div>
  );
};

const TextCheckBox = ({
  text,
  inputId,
  inputName,
  setStateList,
  stateList,
  value,
}) => {
  const CheckHandler = (value, isChecked) => {
    if (isChecked) {
      setStateList((prev) => [...prev, value]);
    } else {
      setStateList(stateList.filter((item) => item !== value));
    }
  };

  return (
    <div className={style.TextCheckBox}>
      <label htmlFor={inputId}>
        <input
          type="checkbox"
          id={inputId}
          name={inputName}
          onChange={(e) => {
            CheckHandler(value, e.target.checked);
          }}
        />
        <span className={style.text_area}>
          <span>{text}</span>
        </span>
      </label>
    </div>
  );
};

export { CheckBox, TextCheckBox };
