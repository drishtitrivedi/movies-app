import React from "react";

const Input = ({ name, label, error, value, onChange, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        {...rest}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
