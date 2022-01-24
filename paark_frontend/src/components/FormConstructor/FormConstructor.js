import React from "react";
import InputField from "../FormElement/InputField/InputField";
import PhoneField from "../FormElement/PhoneField/PhoneField";
import GooglePlacesAutocompleteField from "../FormElement/GooglePlacesAutocompleteField/GooglePlacesAutocompleteField";
import SelectField from "../FormElement/SelectField/SelectField";

const FormConstructor = ({ events, field }) => {
  switch (field.type) {
    case "text":
      return <InputField {...events} {...field} />;
    case "select":
      return <SelectField {...events} {...field} />;
    case "phone":
      return <PhoneField {...events} {...field} />;
    case "email":
      return <InputField {...events} {...field} />;
    case "google-places":
      return <GooglePlacesAutocompleteField {...events} {...field} />;
    default:
      return;
  }
};

export default FormConstructor;
