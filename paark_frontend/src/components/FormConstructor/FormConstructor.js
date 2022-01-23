import React from "react";
import InputField from "../FormElement/InputField/InputField";
import GooglePlacesAutocompleteField from "../FormElement/GooglePlacesAutocompleteField/GooglePlacesAutocompleteField";

const FormConstructor = ({ events, field }) => {
  switch (field.type) {
    case "text":
      return <InputField {...events} {...field} />;
    case "tel":
      return <InputField {...events} {...field} />;
    case "email":
      return <InputField {...events} {...field} />;
    case "google-places":
      return <GooglePlacesAutocompleteField {...events} {...field} />;
    default:
      return;
  }
};

export default FormConstructor;
