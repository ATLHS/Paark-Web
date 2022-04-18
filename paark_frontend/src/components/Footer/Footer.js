import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
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
        <Row className="footer">
          <Col className="footer__legal">
            <Row className="footer__legal__infos">
              <Col
                as={Link}
                className="footer__legal__infos__term-of-use"
                to="/term-of-use"
              >
                Mentions légales
              </Col>
              <Col as={Link} className="footer__legal__infos__rgpd" to="/rgpd">
                RGPD
              </Col>
              {/* <Col as={Link} className="footer__legal__infos__rgpd" to="/cgv">
                C.G.V
              </Col>
              <Col
                as={Link}
                className="footer__legal__infos__cookies"
                to="/cookies"
              >
                Cookies
              </Col> */}
            </Row>
          </Col>
          <Col className="footer__copyright">
            © 2021 - Paark. Tous droits réservés.
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
