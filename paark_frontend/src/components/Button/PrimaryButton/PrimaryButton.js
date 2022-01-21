import Button from "react-bootstrap/Button";
import "./PrimaryButton.scss";

const PrimaryButton = ({ variant, text, size }) => {
  return (
    <>
      <Button className="primary-button" variant={variant}>
        {text}
      </Button>
    </>
  );
};

export default PrimaryButton;
