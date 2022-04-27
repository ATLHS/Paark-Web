import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./TextareaField.scss";

const TextareaField = ({ field: { onChange, name }, label, placeholder }) => (
  <FloatingLabel className="textarea-field" controlId={name} label={label}>
    <Form.Control
      onChange={onChange}
      as="textarea"
      rows={3}
      autoComplete="on"
      placeholder={placeholder}
    />
  </FloatingLabel>
);

export default TextareaField;
