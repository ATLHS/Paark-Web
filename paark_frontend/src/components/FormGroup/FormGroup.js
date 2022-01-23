import React from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormConstructor from "../FormConstructor/FormConstructor";
import MessageHelper from "../MessageHelper/MessageHelper";

const FormGroup = ({ schema, control }) => {
  return schema.map((field, i) => {
    return (
      <Controller
        key={i}
        control={control}
        name={field.name}
        render={(props) => (
          <>
            <FormConstructor events={props} field={field} />
            <ErrorMessage
              errors={props.formState.errors}
              name={field.name}
              render={({ message }) => <MessageHelper message={message} />}
            />
          </>
        )}
        rules={field.validation}
      />
    );
  });
};

export default FormGroup;
