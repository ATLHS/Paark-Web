import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <Container className="footer">
        <Row className="footer__socials">
          <Row className="footer__socials__follow-us">Suivez-nous !</Row>
          <Row className="footer__socials__section">
            <Col className="footer__socials__section__icons">
              <a
                className="footer__socials__section__icons__twitter"
                href="https://twitter.com/paark_fr"
                target="blank"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a
                className="footer__socials__section__icons__instagram"
                href="https://www.instagram.com/paark_fr/?hl=fr"
                target="blank"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </Col>
          </Row>
        </Row>
        <Row className="footer__copyright">
          © 2021 - Paark. Tous droits réservés.
        </Row>
      </Container>
    </>
  );
};

export default Footer;
