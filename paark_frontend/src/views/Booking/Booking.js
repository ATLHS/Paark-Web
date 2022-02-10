import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "../../components/FormGroup/FormGroup";
import PrimaryButton from "../../components/Button/PrimaryButton/PrimaryButton";
import { useForm } from "react-hook-form";
import bookingForm from "../../schemas/bookingForm";
import confirmCodeForm from "../../schemas/verificationCodeField.json";
import user from "../../services/user";
import "./Booking.scss";

const Booking = () => {
  const { handleSubmit: handleSubmit1, control: control1 } = useForm();
  const { handleSubmit: handleSubmit2, control: control2 } = useForm();
  const { handleSubmit: handleSubmit3, control: control3 } = useForm();

  const [bookingSchema, setBookingSchema] = useState([]);
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState("");
  const [confirmCodeSchema, setConfirmCodeSchema] = useState([]);
  const [processStatus, setProcessStatus] = useState({
    userInfo: false,
    confirmCode: false,
    payment: false,
  });
  useEffect(() => {
    const bookingSchemaValidation = Object.keys(bookingForm.fields).map(
      (key) => bookingForm.fields[key]
    );

    const confirmCodeSchemaValidation = Object.keys(confirmCodeForm.fields).map(
      (key) => confirmCodeForm.fields[key]
    );
    setBookingSchema(bookingSchemaValidation);
    setConfirmCodeSchema(confirmCodeSchemaValidation);
  }, []);

  const handleUserInfos = (data) => {
    user
      .handleUserInformation(data)
      .then((res) => res)
      .then((data) => {
        setMessage(data.message);
        setUserData(data.user);
        const { isConfirmed, hasRide } = data.user;
        if (!hasRide) {
          if (!isConfirmed) {
            setProcessStatus((prevStatus) => ({
              ...prevStatus,
              userInfo: true,
            }));
          } else {
            setProcessStatus((prevStatus) => ({
              ...prevStatus,
              userInfo: true,
              confirmCode: true,
            }));
          }
        }
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmUserPhone = (data) => {
    data.userData = userData;
    user
      .handleUserPhoneCode(data)
      .then((res) => res)
      .then((data) => {
        const isConfirmed = data.user.isConfirmed;
        setMessage(data.message);
        if (!isConfirmed) {
          return;
        } else {
          setProcessStatus((prevStatus) => ({
            ...prevStatus,
            userInfo: true,
            confirmCode: true,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePayment = () => {};

  return (
    <Container className="booking">
      <Row className="booking__section">
        <Row className="booking__section__status">
          <Col className="booking__section__status__title">Réservation.</Col>
          <Row className="booking__section__status__helper">
            <Col className="booking__section__status__helper__message">
              {message ? message : ""}
            </Col>
          </Row>
        </Row>
        <Row className="booking__section__process">
          <Row className="booking__section__process__content">
            <Row
              className={`booking__section__process__content__form ${
                processStatus.userInfo ? "switchX1" : ""
              } ${processStatus.confirmCode ? "switchX2" : ""} `}
            >
              {/* user info form */}
              <Col
                className={`booking__section__process__content__form__order  ${
                  processStatus.userInfo ? "hide" : "show"
                }`}
              >
                <Form className="booking__section__process__content__form__order__container">
                  <FormGroup schema={bookingSchema} control={control1} />
                  <Form.Group className="booking__section__process__content__form__order__container__cta">
                    <PrimaryButton
                      className="booking__section__process__content__form__order__container__cta__submit"
                      variant="primary"
                      text="Réserver un voiturier"
                      onClick={handleSubmit1(handleUserInfos)}
                    />
                  </Form.Group>
                </Form>
              </Col>
              {/* confirm code number form */}
              <Col
                className={`booking__section__process__content__form__confirm ${
                  processStatus.userInfo ? "show" : ""
                } ${processStatus.confirmCode ? "hide" : ""} `}
              >
                <Form className="booking__section__process__content__form__confirm__container">
                  <FormGroup schema={confirmCodeSchema} control={control2} />
                  <Form.Group className="booking__section__process__content__form__confirm__container__cta">
                    <PrimaryButton
                      className="booking__section__process__content__form__confirm__container__cta__submit"
                      variant="primary"
                      text="Confirmer"
                      onClick={handleSubmit2(confirmUserPhone)}
                    />
                  </Form.Group>
                </Form>
              </Col>
              {/* payment form */}
              <Col
                className={`booking__section__process__content__form__pay ${
                  processStatus.confirmCode ? "show" : ""
                } `}
              >
                <Form
                  className="booking__section__process__content__form__pay__container"
                  onSubmit={handleSubmit3(handlePayment)}
                >
                  <FormGroup schema={bookingSchema} control={control3} />
                  <Form.Group className="booking__section__process__content__form__pay__container__cta">
                    <PrimaryButton
                      className="booking__section__process__content__form__pay__container__cta__submit"
                      variant="success"
                      text="Réserver un voiturier"
                    >
                      Réserver un voiturier
                    </PrimaryButton>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Row>
        </Row>
      </Row>
    </Container>
  );
};

export default Booking;
