import React from "react";
import InputField from "../FormElement/InputField/InputField";
import PhoneField from "../FormElement/PhoneField/PhoneField";
import GooglePlacesAutocompleteField from "../FormElement/GooglePlacesAutocompleteField/GooglePlacesAutocompleteField";
import SelectField from "../FormElement/SelectField/SelectField";
import VerificationCodeField from "../FormElement/VerificationCodeField/VerificationCodeField";
import TextareaField from "../FormElement/TextareaField/TextareaField";

const FormConstructor = ({ events, field }) => {
  switch (field.type) {
    case "text":
    case "email":
    case "password":
      return <InputField {...events} {...field} />;
    case "textarea":
      return <TextareaField {...events} {...field} />;
    case "select":
      return <SelectField {...events} {...field} />;
    case "phone":
      return <PhoneField {...events} {...field} />;
    case "google-places":
      return <GooglePlacesAutocompleteField {...events} {...field} />;
    case "tel":
      return <VerificationCodeField {...events} {...field} />;
    default:
      return;
  }
};

export default FormConstructor;
