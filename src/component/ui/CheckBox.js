import style from "./CheckBox.module.css";

const CheckBox = ({ text, inputId, inputName }) => {
  return (
    <div className={style.CheckBox}>
      <input type="checkbox" id={inputId} name={inputName} />
      <label htmlFor={inputId}>{text}</label>
    </div>
  );
};

const TextCheckBox = ({ text, inputId, inputName, isChecked, onChange }) => {
  return (
    <div className={style.TextCheckBox}>
      <label htmlFor={inputId}>
        <input
          type="checkbox"
          id={inputId}
          name={inputName}
          checked={isChecked}
          onChange={onChange}
        />
        <span className={style.text_area}>
          <span>{text}</span>
        </span>
      </label>
    </div>
  );
};

export { CheckBox, TextCheckBox };
