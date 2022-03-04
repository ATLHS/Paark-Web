import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import getUserNumberForm from "../../schemas/getUserNumberForm";
import confirmCodeForm from "../../schemas/verificationCodeField.json";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import FormGroup from "../../components/FormGroup/FormGroup";
import PrimaryButton from "../../components/Button/PrimaryButton/PrimaryButton";
import Spinner from "react-bootstrap/Spinner";
import constStatus from "../../constants/status";
import user from "../../services/user";
import "./GetCar.scss";

const GetCar = () => {
  const { handleSubmit: handleSubmit1, control: control1 } = useForm();
  const { handleSubmit: handleSubmit2, control: control2 } = useForm();
  const [phoneSchema, setPhoneSchema] = useState([]);
  const [confirmCodeSchema, setConfirmCodeSchema] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [processStatus, setProcessStatus] = useState({
    userInfo: false,
    confirmCode: false,
    location: false,
  });
  useEffect(() => {
    const phoneSchemaValidation = Object.keys(getUserNumberForm.fields).map(
      (key) => getUserNumberForm.fields[key]
    );

    const confirmCodeSchemaValidation = Object.keys(confirmCodeForm.fields).map(
      (key) => confirmCodeForm.fields[key]
    );
    setPhoneSchema(phoneSchemaValidation);
    setConfirmCodeSchema(confirmCodeSchemaValidation);
  }, []);

  const titleStatus = () => {
    return !processStatus.userInfo
      ? "NUMÉRO DE TÉLÉPHONE"
      : "CONFIRMEZ VOTRE NUMÉRO";
  };

  const checkUserPhone = (data) => {
    setIsLoading(true);
    user
      .handleUserPhone(data)
      .then((res) => res)
      .then((data) => {
        setIsLoading(false);
        setMessage(data.message);
        console.log(data);

        if (data.status === constStatus.PICKEDUP) {
          setProcessStatus((prevStatus) => ({
            ...prevStatus,
            userInfo: true,
          }));
        }
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmUserPhone = (data) => {
    setIsLoading(true);
    // data.userData = userData;
    // user
    //   .handleUserPhoneCode(data)
    //   .then((res) => res)
    //   .then((data) => {
    //     setIsLoading(false);
    //     const isConfirmed = data.user.isConfirmed;
    //     setMessage(data.message);
    //     if (!isConfirmed) {
    //       return;
    //     } else {
    //       setUserData(data.user);
    //       setProcessStatus((prevStatus) => ({
    //         ...prevStatus,
    //         userInfo: true,
    //         confirmCode: true,
    //       }));
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <Container className="get-car">
      <Row className="get-car__section">
        <Row className="get-car__section__status">
          <Col className="get-car__section__status__title">{titleStatus()}</Col>
          <Row className="get-car__section__status__helper">
            <Col className="get-car__section__status__helper__message">
              {message ? message : ""}
            </Col>
          </Row>
        </Row>
        <Row className="get-car__section__process">
          <Row className="get-car__section__process__content">
            <Row
              className={`get-car__section__process__content__form ${
                processStatus.userInfo ? "switchX1" : ""
              } ${processStatus.confirmCode ? "switchX2" : ""} `}
            >
              {/* user info form */}
              <Col
                className={`get-car__section__process__content__form__phone  ${
                  processStatus.userInfo ? "hide" : "show"
                } `}
              >
                <Form className="get-car__section__process__content__form__phone__container">
                  <FormGroup schema={phoneSchema} control={control1} />
                  <Form.Group className="get-car__section__process__content__form__phone__container__cta">
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
                      onClick={handleSubmit1(checkUserPhone)}
                    />
                  </Form.Group>
                </Form>
              </Col>
              {/* confirm code number form */}
              <Col
                className={`get-car__section__process__content__form__confirm ${
                  processStatus.userInfo ? "show" : ""
                } ${processStatus.confirmCode ? "hide" : ""} `}
              >
                <Form className="get-car__section__process__content__form__confirm__container">
                  <FormGroup schema={confirmCodeSchema} control={control2} />
                  <Form.Group className="get-car__section__process__content__form__confirm__container__cta">
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
            </Row>
          </Row>
        </Row>
      </Row>
    </Container>
  );
};

export default GetCar;
