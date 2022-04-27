import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import contactForm from "../../schemas/contactForm";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import FormGroup from "../../components/FormGroup/FormGroup";
import PrimaryButton from "../../components/Button/PrimaryButton/PrimaryButton";
import Spinner from "react-bootstrap/Spinner";
import contact from "../../services/contact";
import "./Contact.scss";

const Contact = () => {
  const { handleSubmit: handleSubmit1, control: control1 } = useForm();
  const [userInfoSchema, setUserInfoSchema] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const contactSchemaValidation = Object.keys(contactForm.fields).map(
      (key) => contactForm.fields[key]
    );

    setUserInfoSchema(contactSchemaValidation);
  }, []);

  const handleMessage = (data) => {
    setIsLoading(true);
    contact
      .sendSupportMessage(data)
      .then((res) => res)
      .then((data) => {
        setIsLoading(false);
        setMessage(data.message);
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="contact-form">
      <Row className="contact-form__section">
        <Row className="contact-form__section__status">
          <Col className="contact-form__section__status__title">
            NOUS CONTACTER
          </Col>
          <Row className="contact-form__section__status__helper">
            <Col className="contact-form__section__status__helper__message">
              {message
                ? message
                : "Remplissez le formulaire ci-dessous et un membre de notre équipe vous contactera au plus vite."}
            </Col>
          </Row>
        </Row>
        <Row className="contact-form__section__process">
          <Row className="contact-form__section__process__content">
            <Row className="contact-form__section__process__content__form">
              {/* user info form */}
              <Col className="contact-form__section__process__content__form__fields">
                <Form className="contact-form__section__process__content__form__fields__container">
                  <FormGroup schema={userInfoSchema} control={control1} />
                  <Form.Group className="contact-form__section__process__content__form__fields__container__cta">
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
                            Contactez-nous !
                          </>
                        ) : (
                          "Contactez-nous !"
                        )
                      }
                      onClick={handleSubmit1(handleMessage)}
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

export default Contact;
