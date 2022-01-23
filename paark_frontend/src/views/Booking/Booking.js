import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormGroup from "../../components/FormGroup/FormGroup";
import PrimaryButton from "../../components/Button/PrimaryButton/PrimaryButton";
import { useForm } from "react-hook-form";
import bookingForm from "../../schemas/bookingForm";
import "./Booking.scss";

const Booking = () => {
  const { handleSubmit, control } = useForm();
  const [formSchema, setFormSchema] = useState([]);

  useEffect(() => {
    const schemaProperties = Object.keys(bookingForm.fields).map(
      (key) => bookingForm.fields[key]
    );

    setFormSchema(schemaProperties);
  }, []);

  const onSubmit = (data) => {
    console.log("hello");
    console.log(data, "data");
  };

  return (
    <Container className="booking">
      <Row className="booking__section">
        <Col className="booking__section__form">
          <Row className="booking__section__form__reservation">
            <Col className="booking__section__form__reservation__title">
              Réservation.
            </Col>
          </Row>
          <Form
            className="booking__section__form__container"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormGroup schema={formSchema} control={control} />
            <Form.Group className="booking__section__form__container__cta">
              <Button
                variant="primary"
                text="Réserver un voiturier"
                type="submit"
              >bbbb</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Booking;
