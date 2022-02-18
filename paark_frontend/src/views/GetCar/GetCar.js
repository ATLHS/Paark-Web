import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./GetCar.scss";

const GetCar = () => {
  const [processStatus, setProcessStatus] = useState({
    userInfo: false,
    confirmCode: false,
    location: false,
  });
  useEffect(() => {}, []);

  const titleStatus = () => {
    return !processStatus.userInfo
      ? "NUMÉRO DE TÉLÉPHONE"
      : "CONFIRMEZ VOTRE NUMÉRO";
    // setProcessStatus();
  };

  return (
    <Container className="get-car">
      <Row className="get-car__section">
        <Row className="get-car__section__status">
          <Col className="get-car__section__status__title">{titleStatus()}</Col>
          <Row className="get-car__section__status__helper">
            <Col className="get-car__section__status__helper__message">
              {/* {message ? message : ""} */}
            </Col>
          </Row>
        </Row>
      </Row>
    </Container>
  );
};

export default GetCar;
