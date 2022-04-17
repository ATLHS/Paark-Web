import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <Container className="footer">
        <Row className="footer__socials">
          <Row className="footer__socials__follow-us">Suivez-nous !</Row>
          <Row className="footer__socials__twitter">
            <a href="https://twitter.com/paark_fr" target="blank">
              <FontAwesomeIcon
                as="a"
                href="https://twitter.com/paark_fr"
                icon={faTwitter}
                size="2x"
              />
            </a>
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
