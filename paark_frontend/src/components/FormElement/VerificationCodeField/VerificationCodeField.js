import Row from "react-bootstrap/Row";
import "./VerificationCodeField.scss";
import ReactCodeInput from "react-verification-code-input";

const VerificationCodeField = ({
  field: { onChange, onBlur, name, ref },
  fieldState: { invalid, isTouched, isDirty, error },
  formState: { errors },
  type,
  label,
  placeholder,
}) => {
  return (
    <Row>
      <ReactCodeInput
        className="verification-code"
        autoFocus={false}
        fields={4}
        type="number"
        onChange={onChange}
      />
    </Row>
  );
};

export default VerificationCodeField;
