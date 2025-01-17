import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "../../components/FormGroup/FormGroup";
import PrimaryButton from "../../components/Button/PrimaryButton/PrimaryButton";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { useForm } from "react-hook-form";
import bookingForm from "../../schemas/bookingForm";
import confirmCodeForm from "../../schemas/verificationCodeField.json";
import user from "../../services/user";
import paymentServices from "../../services/payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";
import "./Booking.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_PUBLIC_KEY);

const Booking = () => {
  const {
    handleSubmit: handleSubmit1,
    // watch,
    // clearErrors,
    control: control1,
  } = useForm();
  const { handleSubmit: handleSubmit2, control: control2 } = useForm();

  const [index, setIndex] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [bookingSchema, setBookingSchema] = useState([]);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [confirmCodeSchema, setConfirmCodeSchema] = useState([]);
  const [processStatus, setProcessStatus] = useState({
    userInfo: false,
    confirmCode: false,
    payment: false,
  });
  // const watchParking = watch("parking");
  // const watchRoadway = watch("roadway");

  useEffect(() => {
    let bookingSchemaValidation = Object.keys(bookingForm.fields).map(
      (key) => bookingForm.fields[key]
    );

    const confirmCodeSchemaValidation = Object.keys(confirmCodeForm.fields).map(
      (key) => confirmCodeForm.fields[key]
    );

    setBookingSchema(bookingSchemaValidation);
    setConfirmCodeSchema(confirmCodeSchemaValidation);
    
    if (processStatus.confirmCode) {
      // Create PaymentIntent as soon as the page loads
      paymentServices.getPaymentIntent(userData).then(({ data }) => {
        setClientSecret(data.clientSecret);
      });
    }
  }, [userData, processStatus.confirmCode]);

  // useEffect(() => {
  //   if (watchParking || watchRoadway) {
  //     setBookingSchema(
  //       bookingSchema.map((schema) => {
  //         if (schema.name === "parking" || schema.name === "roadway") {
  //           return {
  //             ...schema,
  //             validation: { required: { value: false, message: "" } },
  //           };
  //         }
  //         return schema;
  //       })
  //     );
  //     clearErrors(["parking", "roadway"]);
  //   } else {
  //     const bookingSchemaValidation = Object.keys(bookingForm.fields).map(
  //       (key) => bookingForm.fields[key]
  //     );
  //     setBookingSchema(bookingSchemaValidation);
  //   }
  // }, [watchParking, watchRoadway]);

  // stripe options
  const appearance = {
    theme: "stripe",
    labels: "floating",
    variables: {
      colorDanger: "#dc3545",
    },
    rules: {
      ".Input": {
        padding: "10px",
        marginBottom: "1rem",
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  const titleStatus = () => {
    return !processStatus.userInfo
      ? "OÙ ALLEZ-VOUS ?"
      : !processStatus.confirmCode
      ? "CONFIRMEZ VOTRE NUMÉRO"
      : "PAIEMENT";
  };

  const handleUserInfos = (data) => {
    setIsLoading(true);
    user
      .handleUserInformation(data)
      .then((res) => res)
      .then((data) => {
        setIsLoading(false);
        setMessage(data.message);
        setUserData(data.user);
        const { isConfirmed, hasRide } = data.user;
        if (hasRide) {
          return;
        }
        if (!isConfirmed) {
          setProcessStatus((prevStatus) => ({
            ...prevStatus,
            userInfo: true,
          }));
          setIndex(1);
        } else {
          setProcessStatus((prevStatus) => ({
            ...prevStatus,
            userInfo: true,
            confirmCode: true,
          }));
          setIndex(2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmUserPhone = (data) => {
    setIsLoading(true);
    data.userData = userData;
    user
      .handleUserPhoneCode(data)
      .then((res) => res)
      .then((data) => {
        setIsLoading(false);
        const isConfirmed = data.user.isConfirmed;
        setMessage(data.message);
        if (!isConfirmed) {
          return;
        } else {
          setUserData(data.user);
          setProcessStatus((prevStatus) => ({
            ...prevStatus,
            userInfo: true,
            confirmCode: true,
          }));
          setIndex(2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="booking">
      <Row className="booking__section">
        <Row className="booking__section__status">
          <Col className="booking__section__status__title">{titleStatus()}</Col>
          <Row className="booking__section__status__helper">
            <Col className="booking__section__status__helper__message">
              {message ? message : ""}
            </Col>
          </Row>
        </Row>
        <Row className="booking__section__process">
          <Row className="booking__section__process__content">
            <Row className={`booking__section__process__content__form`}>
              <Carousel
                activeIndex={index}
                keyboard={false}
                touch={false}
                bsPrefix="booking__section__process__content__form__slider carousel"
              >
                <Carousel.Item
                  className={`booking__section__process__content__form__slider__items`}
                >
                  {/* user info form */}
                  <Col
                    className={`booking__section__process__content__form__slider__items__order ${
                      processStatus.userInfo ? "hide" : "show"
                    } `}
                  >
                    <Form className="booking__section__process__content__form__slider__items__order__container">
                      <FormGroup schema={bookingSchema} control={control1} />
                      <Form.Group className="booking__section__process__content__form__slider__items__order__container__cta">
                        <PrimaryButton
                          variant="blue-paark"
                          size="large"
                          disabled={isLoading ? true : false}
                          text={
                            isLoading ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />{" "}
                                Réservez un voiturier
                              </>
                            ) : (
                              "Réservez un voiturier"
                            )
                          }
                          onClick={handleSubmit1(handleUserInfos)}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                </Carousel.Item>
                <Carousel.Item>
                  {/* confirm code number form */}
                  <Col
                    className={`booking__section__process__content__form__slider__items__confirm ${
                      processStatus.userInfo ? "show" : ""
                    } ${processStatus.confirmCode ? "hide" : ""} `}
                  >
                    <Form className="booking__section__process__content__form__slider__items__confirm__container">
                      <FormGroup
                        schema={confirmCodeSchema}
                        control={control2}
                      />
                      <Form.Group className="booking__section__process__content__form__slider__items__confirm__container__cta">
                        <PrimaryButton
                          variant="blue-paark"
                          size="large"
                          disabled={isLoading ? true : false}
                          text={
                            isLoading ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />{" "}
                                Confirmer
                              </>
                            ) : (
                              "Confirmer"
                            )
                          }
                          onClick={handleSubmit2(confirmUserPhone)}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                </Carousel.Item>
                <Carousel.Item>
                  {/* payment form */}
                  <Col
                    className={`booking__section__process__content__form__slider__items__pay ${
                      processStatus.confirmCode ? "show" : ""
                    } ${processStatus.payment ? "hide" : ""}   `}
                  >
                    <Form className="booking__section__process__content__form__slider__items__pay__container">
                      {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                          <PaymentForm setMessage={setMessage} />
                        </Elements>
                      )}
                    </Form>
                  </Col>
                </Carousel.Item>
              </Carousel>
            </Row>
          </Row>
        </Row>
      </Row>
    </Container>
  );
};

export default Booking;
