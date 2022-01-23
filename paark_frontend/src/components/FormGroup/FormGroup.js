import React from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Col from "react-bootstrap/Col";
import FormConstructor from "../FormConstructor/FormConstructor";
import MessageHelper from "../MessageHelper/MessageHelper";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./FormGroup.scss";

const FormGroup = ({ schema, control }) => {
  return schema.map((field, i) => {
    return (
      <Col key={i} className="form-group">
        <Controller
          control={control}
          name={field.name}
          render={(props) => (
            <>
              <FormConstructor events={props} field={field} />
              <Row>
                {field.helper ? (
                  <Form.Text muted>{field.helper}</Form.Text>
                ) : (
                  ""
                )}
              </Row>
              <ErrorMessage
                errors={props.formState.errors}
                name={field.name}
                render={({ message }) => <MessageHelper message={message} />}
              />
            </>
          )}
          rules={field.validation}
        />
      </Col>
    );
  });
};

export default FormGroup;
