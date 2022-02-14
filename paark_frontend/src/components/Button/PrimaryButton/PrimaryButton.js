import "./PrimaryButton.scss";

const PrimaryButton = ({ text, onClick, type, variant, size, disabled }) => {
  return (
    <>
      <button
        className={`primary-button ${variant} ${size}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};

export default PrimaryButton;
