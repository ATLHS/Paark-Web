import React from "react";
import Form from "react-bootstrap/Form";
import "./CheckboxField.scss";

const CheckboxField = ({
  field: { onChange, onBlur, value, name, ref },
  fieldState: { invalid, isTouched, isDirty, error },
  formState: { errors },
  type,
  label,
  value: v,
  id,
}) => {
  return (
    <>
      <Form.Check
        id={id}
        onChange={onChange}
        type={type}
        label={label}
        value={v}
        name={name}
      />
    </>
  );
};

export default CheckboxField;
