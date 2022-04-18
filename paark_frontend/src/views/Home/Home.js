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
import paark_assurance from "../../assets/images/paark_assurance.svg";
import advantage1 from "../../assets/images/advantage1.gif";
import advantage2 from "../../assets/images/advantage2.gif";
import advantage3 from "../../assets/images/advantage3.gif";
import "./Home.scss";

const Home = () => {
  let navigate = useNavigate();
  return (
    <Container className="home">
      <Row className="home__headlines">
        <Col className="home__headlines__container">
          <Col className="home__headlines__container__image__mobile">
            <Image
              className="home__headlines__container__image__mobile__paark-home"
              src={paark_home}
              rounded
            />
          </Col>
          <Row className="home__headlines__container__headline">
            Service de voiturier à la demande.
          </Row>
          <Row className="home__headlines__container__sub-headline">
            Ne tournez plus en rond à la recherche d'une place de stationnement.
          </Row>
          <Row className="home__headlines__container__ctas">
            <PrimaryButton
              variant="blue-paark"
              size="medium"
              text="Réserver un voiturier"
              onClick={() => navigate("/get-valet")}
            />
            <PrimaryButton
              variant="black-paark"
              size="medium"
              text="Récupérer mon véhicule"
              onClick={() => navigate("/get-car")}
            />
          </Row>
          <Row className="home__headlines__container__insurance-infos">
            Véhicule assuré pendant la prise en charge par
            <Image
              className="home__headlines__container__insurance-infos__icon"
              src={paark_assurance}
              rounded
            />
          </Row>
        </Col>
        <Col className="home__headlines__image__desktop">
          <Image
            className="home__headlines__image__desktop__paark-home"
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
            <Card.Title className="home__steps__card__container__title">
              RÉSERVEZ
            </Card.Title>
            <Card.Text className="home__steps__card__container__description">
              Un voiturier en ligne en moins de 5 mins.
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
            <Card.Title className="home__steps__card__container__title">
              CONFIEZ
            </Card.Title>
            <Card.Text className="home__steps__card__container__description">
              Votre véhicule au voiturier sur le lieu de prise en charge.
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
            <Card.Title className="home__steps__card__container__title">
              RÉCUPÉREZ
            </Card.Title>
            <Card.Text className="home__steps__card__container__description">
              Votre véhicule n'importe ou dans Paris uniquement.
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
            <Card.Title className="home__steps__card__container__title">
              PAYEZ
            </Card.Title>
            <Card.Text className="home__steps__card__container__description">
              Le stationnement du parking à la remise des clés et c'est tout !
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <Row className="home__benefits">
        <Col className="home__benefits__title">Les avantages</Col>
      </Row>
      <Row className="home__advantages">
        <Row className="home__advantages__b">
          <Col className="home__advantages__b__container">
            <Image
              className="home__advantages__b__container__image"
              src={advantage1}
              rounded
            />
          </Col>
          <Col className="home__advantages__b__infos">
            <Row className="home__advantages__b__infos__description">
              <Row className="home__advantages__b__infos__description__title">
                Simple.
              </Row>
              Prenez la route sereinement, sans stress et sans appréhension du
              calvaire du stationnement dans Paris, on s'occupe de tout !
            </Row>
          </Col>
        </Row>
        <Row className="home__advantages__b advantage-two">
          <Col className="home__advantages__b__container">
            <Row className="home__advantages__b__infos__description">
              <Row className="home__advantages__b__infos__description__title">
                Pratique.
              </Row>
              Évitez de tourner en rond à la recherche d'une place c'est mauvais
              pour l’environnement et surtout pour votre portefeuille.
            </Row>
          </Col>
          <Col className="home__advantages__b__infos advantage-two">
            <Image
              className="home__advantages__b__container__image"
              src={advantage2}
              rounded
            />
          </Col>
        </Row>
        <Row className="home__advantages__b">
          <Col className="home__advantages__b__container">
            <Image
              className="home__advantages__b__container__image"
              src={advantage3}
              rounded
            />
          </Col>
          <Col className="home__advantages__b__infos">
            <Row className="home__advantages__b__infos__description">
              <Row className="home__advantages__b__infos__description__title">
                Magique.
              </Row>
              Ne cherchez plus votre voiture dite-nous ou vous voulez la
              récupérer et nous vous la restituerons et cela n'importe ou dans
              Paris !
            </Row>
          </Col>
        </Row>
      </Row>
      <Row className="home__ctas">
        <PrimaryButton
          variant="blue-paark"
          size="medium"
          text="Réserver maintenant"
          onClick={() => navigate("/get-valet")}
        />
      </Row>
    </Container>
  );
};

export default Home;
