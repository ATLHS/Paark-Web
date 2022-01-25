import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "../../components/FormGroup/FormGroup";
import PrimaryButton from "../../components/Button/PrimaryButton/PrimaryButton";
import { useForm } from "react-hook-form";
import bookingForm from "../../schemas/bookingForm";
import getUserCar from "../../services/getUserCar";
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
    getUserCar
      .getUserCarReservation(data)
      .then((res) => res)
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });
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
              <PrimaryButton
                className="booking__section__form__container__cta__submit"
                variant="primary"
                text="Réserver un voiturier"
                type="submit"
              >
                Réserver un voiturier
              </PrimaryButton>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Booking;
