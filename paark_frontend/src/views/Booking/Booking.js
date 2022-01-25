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
  const [hide, setHide] = useState(false);

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
        <Row className="booking__section__status">
          <Col className="booking__section__status__title">Réservation.</Col>
          <Row className="booking__section__status__helper">
            <Col className="booking__section__status__helper__message">
              Réservation.
            </Col>
          </Row>
        </Row>
        <Row className="booking__section__content">
          <Row className="booking__section__content__form">
            <Col className="booking__section__content__form__order">
              <Form
                className={`booking__section__content__form__order__container ${
                  hide ? "switch" : ""
                } `}
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormGroup schema={formSchema} control={control} />
                <Form.Group className="booking__section__content__form__order__container__cta">
                  <PrimaryButton
                    className="booking__section__content__form__order__container__cta__submit"
                    variant="primary"
                    text="Réserver un voiturier"
                    // type="submit"
                    onClick={() => setHide(true)}
                  >
                    Réserver un voiturier
                  </PrimaryButton>
                </Form.Group>
              </Form>
            </Col>
            <Col className="booking__section__content__form__confirm">
              <Form
                className={`booking__section__content__form__confirm__container ${
                  hide ? "switch" : ""
                } `}
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormGroup schema={formSchema} control={control} />
                <Form.Group className="booking__section__content__form__confirm__container__cta">
                  <PrimaryButton
                    className="booking__section__content__form__confirm__container__cta__submit"
                    variant="danger"
                    text="Réserver un voiturier"
                    // type="submit"
                    onClick={() => setHide(true)}
                  >
                    Réserver un voiturier
                  </PrimaryButton>
                </Form.Group>
              </Form>
            </Col>
            <Col className="booking__section__content__form__pay">
              <Row className="booking__section__content__form__reservation">
                <Col className="booking__section__content__form__reservation__title">
                  Réservation.
                </Col>
              </Row>
              <Form
                className={`booking__section__content__form__pay__container ${
                  hide ? "switch" : ""
                } `}
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormGroup schema={formSchema} control={control} />
                <Form.Group className="booking__section__content__form__pay__container__cta">
                  <PrimaryButton
                    className="booking__section__content__form__pay__container__cta__submit"
                    variant="success"
                    text="Réserver un voiturier"
                    // type="submit"
                    onClick={() => setHide(true)}
                  >
                    Réserver un voiturier
                  </PrimaryButton>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Row>
      </Row>
    </Container>
  );
};

export default Booking;
