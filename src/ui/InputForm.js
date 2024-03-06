"use client";

const InputForm = ({ label, type, name, register }) => {
  return (
    <div className="tr-form">
      <label htmlFor={name} className="th-label">
        <span className="req">{label}</span>
      </label>

      <div className="td-form">
        <input
          type={type}
          id={name}
          name={name}
          {...(register && register(name))}
          className="form-control"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default InputForm;
