import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "../../components/FormGroup/FormGroup";
import PrimaryButton from "../../components/Button/PrimaryButton/PrimaryButton";
import { useForm } from "react-hook-form";
import adminCodeForm from "../../schemas/adminCodeForm";
import adminEmailForm from "../../schemas/adminEmailForm";
import adminPasswordForm from "../../schemas/adminPasswordForm";
import admin from "../../services/admin";
import Spinner from "react-bootstrap/Spinner";
import "./AdminSignup.scss";

const AdminSignup = () => {
  const { handleSubmit: handleSubmit1, control: control1 } = useForm();
  const { handleSubmit: handleSubmit2, control: control2 } = useForm();
  const { handleSubmit: handleSubmit3, control: control3 } = useForm();

  // schemas
  const [emailSchema, setAdminEmailSchema] = useState([]);
  const [codeSchema, setAdminCodeSchema] = useState([]);
  const [passwordSchema, setAdminPasswordSchema] = useState([]);

  //   const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //   const [message, setMessage] = useState(null);
    const [processStatus, setProcessStatus] = useState({
      userInfo: false,
      confirmCode: false,
      payment: false,
    });
  useEffect(() => {
    const emailSchemaValidation = Object.keys(adminEmailForm.fields).map(
      (key) => adminEmailForm.fields[key]
    );

    const codeSchemaValidation = Object.keys(adminCodeForm.fields).map(
      (key) => adminCodeForm.fields[key]
    );

    const passwordSchemaValidation = Object.keys(adminPasswordForm.fields).map(
      (key) => adminPasswordForm.fields[key]
    );

    setAdminEmailSchema(emailSchemaValidation);
    setAdminCodeSchema(codeSchemaValidation);
    setAdminPasswordSchema(passwordSchemaValidation);
  }, []);

  const titleStatus = () => {
    return !processStatus.adminInfo
      ? "INSCRIPTION ADMIN"
      : !processStatus.confirmCode
      ? "CONFIRMEZ VOTRE EMAIL"
      : "MOT DE PASSE";
  };

  const handleSignUp = (data) => {
    setIsLoading(true);
    admin
    .handleAdminSignUp(data)
    .then((res) => res)
    .then((data) => {
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const confirmAdminEmail = (data) => {
    setIsLoading(true);
  };

  const handlePassword = (data) => {
    setIsLoading(true);
  };

  return (
    <Container className="admin-signup">
      <Row className="admin-signup__section">
        <Row className="admin-signup__section__status">
          <Col className="admin-signup__section__status__title">
            {titleStatus()}
          </Col>
          <Row className="admin-signup__section__status__helper">
            <Col className="admin-signup__section__status__helper__message">
              {/* {message ? message : ""} */}
            </Col>
          </Row>
        </Row>
        <Row className="admin-signup__section__process">
          <Row className="admin-signup__section__process__content">
            <Row
              className={`admin-signup__section__process__content__form ${
                processStatus.adminInfo ? "switchX1" : ""
              } ${processStatus.confirmCode ? "switchX2" : ""} `}
            >
              {/* admin email form */}
              <Col
                className={`admin-signup__section__process__content__form__order  ${
                  processStatus.adminInfo ? "hide" : "show"
                } `}
              >
                <Form className="admin-signup__section__process__content__form__order__container">
                  <FormGroup schema={emailSchema} control={control1} />
                  <Form.Group className="admin-signup__section__process__content__form__order__container__cta">
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
                            Inscription
                          </>
                        ) : (
                          "Inscription"
                        )
                      }
                      onClick={handleSubmit1(handleSignUp)}
                    />
                  </Form.Group>
                </Form>
              </Col>
              {/* admin code form */}
              <Col
                className={`admin-signup__section__process__content__form__confirm ${
                  processStatus.adminInfo ? "show" : ""
                } ${processStatus.confirmCode ? "hide" : ""} `}
              >
                <Form className="admin-signup__section__process__content__form__confirm__container">
                  <FormGroup schema={codeSchema} control={control2} />
                  <Form.Group className="admin-signup__section__process__content__form__confirm__container__cta">
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
                      onClick={handleSubmit2(confirmAdminEmail)}
                    />
                  </Form.Group>
                </Form>
              </Col>
              {/* admin password form */}
              <Col
                className={`admin-signup__section__process__content__form__password ${
                  processStatus.adminInfo ? "show" : ""
                } ${processStatus.confirmCode ? "hide" : ""} `}
              >
                <Form className="admin-signup__section__process__content__form__password__container">
                  <FormGroup schema={passwordSchema} control={control3} />
                  <Form.Group className="admin-signup__section__process__content__form__password__container__cta">
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
                      onClick={handleSubmit3(handlePassword)}
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

export default AdminSignup;
