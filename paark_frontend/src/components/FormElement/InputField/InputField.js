import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./InputField.scss";

const InputField = ({
  field: { onChange, onBlur, value, name, ref },
  fieldState: { invalid, isTouched, isDirty, error },
  formState: { errors },
  type,
  label,
  placeholder,
}) => (
  <FloatingLabel className="input-field" controlId={name} label={label}>
    <Form.Control onChange={onChange} type={type} placeholder={placeholder} />
  </FloatingLabel>
);

export default InputField;
