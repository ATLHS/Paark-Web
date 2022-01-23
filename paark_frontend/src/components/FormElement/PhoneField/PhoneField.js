import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import "./PhoneField.scss";

const PhoneField = ({
  field: { onChange, onBlur, value, name, ref },
  fieldState: { invalid, isTouched, isDirty, error },
  formState: { errors },
  type,
  label,
  placeholder,
}) => {
  return (
    <>
      <PhoneInput
        disableCountryCode={true}
        masks={{ fr: ".. .. .. .. .." }}
        containerClass={"phone-field"}
        inputClass={"phone-field__input"}
        placeholder="Numéro de téléphone"
        onlyCountries={["fr"]}
        country={"fr"}
        inputProps={{
          name: "phone",
        }}
        onChange={onChange}
        disableDropdown={true}
      />
    </>
  );
};

export default PhoneField;
