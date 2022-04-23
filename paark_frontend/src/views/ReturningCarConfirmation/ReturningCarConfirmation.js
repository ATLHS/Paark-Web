import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import PrimaryButton from "../../components/Button/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";
import "./ReturningCarConfirmation.scss";

const ReturningCarConfirmation = () => {
  let navigate = useNavigate();
  return (
    <Container className="returning-car-confirmation">
      <Row className="returning-car-confirmation__headlines">
        <Col className="returning-car-confirmation__headlines__container">
          <Row className="returning-car-confirmation__headlines__container__icon">
            <FontAwesomeIcon icon={faCheckDouble} size="7x" />
          </Row>
          <Row className="returning-car-confirmation__headlines__container__title">
            LA RESTITUTION DE VOTRE VÉHICULE EST EN COURS !
          </Row>
          <Row className="returning-car-confirmation__headlines__container__description">
            Un SMS de confirmation va vous a être envoyé.
          </Row>
          <Row className="returning-car-confirmation__headlines__container__action">
            <Form.Group className="returning-car-confirmation__headlines__container__action__cta">
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

export default ReturningCarConfirmation;
