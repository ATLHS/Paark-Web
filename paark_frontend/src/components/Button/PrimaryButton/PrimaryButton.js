import Button from "react-bootstrap/Button";
import "./PrimaryButton.scss";

const PrimaryButton = ({ variant, text, onClick, type }) => {
  return (
    <>
      <Button variant={variant} onClick={onClick} type={type}>
        {text}
      </Button>
    </>
  );
};

export default PrimaryButton;
