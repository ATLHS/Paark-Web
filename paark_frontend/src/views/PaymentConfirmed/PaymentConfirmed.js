import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import PrimaryButton from "../../components/Button/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";
import "./PaymentConfirmed.scss";

const PaymentConfirmed = () => {
  let navigate = useNavigate();
  return (
    <Container className="payment-confirmed">
      <Row className="payment-confirmed__headlines">
        <Col className="payment-confirmed__headlines__container">
          <Row className="payment-confirmed__headlines__container__icon">
            <FontAwesomeIcon icon={faCheckDouble} size="7x" />
          </Row>
          <Row className="payment-confirmed__headlines__container__title">
            PAIEMENT CONFIRMÉ !
          </Row>
          <Row className="payment-confirmed__headlines__container__description">
            Un SMS de confirmation va vous a être envoyé.
          </Row>
          <Row className="payment-confirmed__headlines__container__action">
            <Form.Group className="payment-confirmed__headlines__container__action__cta">
              <PrimaryButton
                variant="blue-paark"
                size="medium"
                text="Retour"
                onClick={() => navigate("/")}
              />
            </Form.Group>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentConfirmed;
