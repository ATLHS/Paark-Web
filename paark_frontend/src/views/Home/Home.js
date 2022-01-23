import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCar,
  faKey,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../../components/Button/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";
import paark_home from "../../assets/images/paark_home.jpg";
import "./Home.scss";

const Home = () => {
  let navigate = useNavigate();
  return (
    <Container className="home">
      <Row className="home__headlines">
        <Col className="home__headlines__container">
          <Row className="home__headlines__container__headline">
            Service de voiturier à la demande.
          </Row>
          <Row className="home__headlines__container__sub-headline">
            Utilisez Paark pour le travail, la maison ou les loisirs : rapide,
            abordable et pratique.
          </Row>
          <Row className="home__headlines__container__ctas">
            <PrimaryButton
              className="home__headlines__container__ctas__get-valet"
              variant="primary"
              text="Réserver un voiturier"
              onClick={() => navigate("/booking")}
            />
            <PrimaryButton
              className="home__headlines__container__ctas__get-car"
              variant="dark"
              text="Récupéré mon véhicule"
            />
          </Row>
        </Col>
        <Col className="home__headlines__image">
          <Image
            className="home__headlines__image__paark-home"
            src={paark_home}
            rounded
          />
        </Col>
      </Row>
      <Row className="home__how-it-works">
        <Col className="home__how-it-works__title">Comment ça marche ?</Col>
      </Row>
      <Row className="home__steps">
        <Card className="home__steps__card">
          <Card.Body className="home__steps__card__container">
            <Card.Header className="home__steps__card__container__step">
              <Col className="home__steps__card__container__step__one">1.</Col>
              <Col className="home__steps__card__container__step__icon">
                <FontAwesomeIcon icon={faCalendarCheck} size="2x" />
              </Col>
            </Card.Header>
            <Card.Title
              className="home__steps__card__container__title"
              style={{ textAlign: "center" }}
            >
              RÉSERVÉ
            </Card.Title>
            <Card.Text
              className="home__steps__card__container__description"
              style={{ textAlign: "center" }}
            >
              Cliquez sur "Réservé un voiturier" indiquez votre destination et
              l'heure d'arrivé puis procédé au paiement. un voiturier vous
              attendra sur le lieu de prise en charge.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="home__steps__card">
          <Card.Body className="home__steps__card__container">
            <Card.Header className="home__steps__card__container__step">
              <Col className="home__steps__card__container__step__one">2.</Col>
              <Col className="home__steps__card__container__step__icon">
                <FontAwesomeIcon icon={faCar} size="2x" />
              </Col>
            </Card.Header>
            <Card.Title
              className="home__steps__card__container__title"
              style={{ textAlign: "center" }}
            >
              CONFIEZ
            </Card.Title>
            <Card.Text
              className="home__steps__card__container__description"
              style={{ textAlign: "center" }}
            >
              Confiez au voiturier votre vehicule qui sera garer dans un parking
              sécurisé au alentour du lieu de prise en charge.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="home__steps__card">
          <Card.Body className="home__steps__card__container">
            <Card.Header className="home__steps__card__container__step">
              <Col className="home__steps__card__container__step__one">3.</Col>
              <Col className="home__steps__card__container__step__icon">
                <FontAwesomeIcon icon={faKey} size="2x" />
              </Col>
            </Card.Header>
            <Card.Title
              className="home__steps__card__container__title"
              style={{ textAlign: "center" }}
            >
              RÉCUPÉRÉ
            </Card.Title>
            <Card.Text
              className="home__steps__card__container__description"
              style={{ textAlign: "center" }}
            >
              Sur paark.fr cliquer sur "Récupéré mon vehicule" puis inqiuer
              votre n° de téléphone et votre localisation. Un SMS vous sera
              envoyer à l'arrivé de votre vehicule.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="home__steps__card">
          <Card.Body className="home__steps__card__container">
            <Card.Header className="home__steps__card__container__step">
              <Col className="home__steps__card__container__step__one">4.</Col>
              <Col className="home__steps__card__container__step__icon">
                <FontAwesomeIcon icon={faCreditCard} size="2x" />
              </Col>
            </Card.Header>
            <Card.Title
              className="home__steps__card__container__title"
              style={{ textAlign: "center" }}
            >
              PAYER
            </Card.Title>
            <Card.Text
              className="home__steps__card__container__description"
              style={{ textAlign: "center" }}
            >
              Le stationement du parking à la remise des clés avec le voiturier
              et c'est tout ! <br /> <br /> Paiement accepté : <br /> CB,
              Paypal, Lydia, ApplePay
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Home;
