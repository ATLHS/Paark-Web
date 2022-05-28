import { useState } from "react";
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
import paris from "../../assets/images/ville_de_paris_logo.png";
import applePay from "../../assets/images/apple_pay.png";
import cb from "../../assets/images/cb.jpg";
import lydia from "../../assets/images/lydia_pay.png";
import tether from "../../assets/images/tether.png";
import paypal from "../../assets/images/paypal.png";
import Accordion from "react-bootstrap/Accordion";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "./Home.scss";

const Home = () => {
  let navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [parisPrice, setParisPrice] = useState(3);
  const [paarkPrice, setPaarkPrice] = useState(5);
  // const [tooltipe, setTooltipe] = useState("30 min");

  const formatteTooltipeLabel = () => {
    switch (value.toString()) {
      case "0":
        setParisPrice(3);
        setPaarkPrice(5);
        return "30 min";
      case "1":
        setParisPrice(6);
        setPaarkPrice(6);
        return "1h";
      case "2":
        setParisPrice(9);
        setPaarkPrice(8);
        return "1h30";
      case "3":
        setParisPrice(12);
        setPaarkPrice(10);
        return "2h";
      case "4":
        setParisPrice(18);
        setPaarkPrice(15);
        return "2h30";
      case "5":
        setParisPrice(24);
        setPaarkPrice(20);
        return "3h";
      case "6":
        setParisPrice(31);
        setPaarkPrice(25);
        return "3h30";
      case "7":
        setParisPrice(39);
        setPaarkPrice(35);
        return "4h";
      case "8":
        setParisPrice(48);
        setPaarkPrice(40);
        return "4h30";
      case "9":
        setParisPrice(57);
        setPaarkPrice(45);
        return "5h";
      case "10":
        setParisPrice(66);
        setPaarkPrice(50);
        return "5h30";
      case "11":
        setParisPrice(75);
        setPaarkPrice(55);
        return "6h";
      default:
        return "bobby";
    }
  };

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
            {/* Ne tournez plus en rond à la recherche d'une place de stationnement. */}
            {/* Un voiturier n'importe où, n'importe quand dans Paris. */}
            Gagner du temps et de l'argent.
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
      <Row className="home__comparison">
        <Col className="home__comparison__title">
          Prix simple, et transparent.
        </Col>
      </Row>
      <Row className="home__comparison">
        <Col className="home__comparison__paark">
          <Row className="home__comparison__paark__logo">
            <Row className="home__comparison__paark__logo__info">
              Coût de la prise en charge avec Paark
            </Row>{" "}
            <Row className="home__comparison__paark__logo__info">
              ( service de voiturier inclue ).
            </Row>
          </Row>
          <Row className="home__comparison__paark__price">{paarkPrice} €</Row>
        </Col>
        <Col className="home__comparison__paris">
          <Row className="home__comparison__paris__logo">
            Coût du stationnement dans Paris.
          </Row>

          <Row className="home__comparison__paris__price">{parisPrice} €</Row>
        </Col>
        <Row className="home__comparison__range">
          <RangeSlider
            min={0}
            max={11}
            variant="dark"
            tooltip="on"
            tooltipPlacement="top"
            className="home__comparison__range__slider"
            value={value}
            tooltipLabel={() => formatteTooltipeLabel()}
            onChange={(changeEvent) => {
              setValue(changeEvent.target.value);
              formatteTooltipeLabel();
            }}
          />
        </Row>
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
              Le stationnement du parking ou de la voirie à la remise des clés.
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
      <Row className="home__common-questions">
        <Col className="home__common-questions__title">
          Questions fréquentes
        </Col>
      </Row>
      <Row className="home__section__common-questions">
        <Col className="home__section__common-questions__container">
          <Accordion
            className="home__section__common-questions__container__accordion"
            flush
          >
            <Accordion.Item
              className="home__section__common-questions__container__accordion__item"
              eventKey="0"
            >
              <Accordion.Header className="home__section__common-questions__container__accordion__item__header">
                Combien ça coûte ?
                <hr />
              </Accordion.Header>
              <Accordion.Body className="home__section__common-questions__container__accordion__item__body">
                Le coût de la prise en charge et de la restitution de votre
                véhicule est de 7€,
                <span className="home__section__common-questions__container__accordion__item__body__warning">
                  ( hors frais de stationnement )
                </span>{" "}
                voir les tarifs de stationnement :
                <br /> -{" "}
                <a
                  className="home__section__common-questions__container__accordion__item__body__infos"
                  href="https://www.paris.fr/pages/payer-son-stationnement-2129"
                  target="_blank"
                  rel="noreferrer"
                >
                  Voirie
                </a>
                <br /> -{" "}
                <a
                  className="home__section__common-questions__container__accordion__item__body__infos"
                  href="https://www.paris.fr/pages/trouver-un-parking-2270"
                  target="_blank"
                  rel="noreferrer"
                >
                  Parking
                </a>
                {/* <br />
                dans Paris. */}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              className="home__section__common-questions__container__accordion__item"
              eventKey="1"
            >
              <Accordion.Header className="home__section__common-questions__container__accordion__item__header">
                Où est garé mon véhicule ?
              </Accordion.Header>
              <Accordion.Body className="home__section__common-questions__container__accordion__item__body">
                Votre véhicule sera stationné selon votre choix en voirie ou
                dans un parking, dans tout les cas le plus proche du lieu de
                prise en charge que vous avez renseigné lors de votre
                réservation.
              </Accordion.Body>
            </Accordion.Item>
            {/* <Accordion.Item
              className="home__section__common-questions__container__accordion__item"
              eventKey="2"
            >
              <Accordion.Header className="home__section__common-questions__container__accordion__item__header">
                Qui gare mon véhicule ?
              </Accordion.Header>
              <Accordion.Body className="home__section__common-questions__container__accordion__item__body">
                La prise en charge de votre véhiocule est effectuée par un voiturier Paark, qui 
              </Accordion.Body>
            </Accordion.Item> */}
            <Accordion.Item
              className="home__section__common-questions__container__accordion__item"
              eventKey="3"
            >
              <Accordion.Header className="home__section__common-questions__container__accordion__item__header">
                Puis-je réserver un voiturier en dehors de Paris ?
              </Accordion.Header>
              <Accordion.Body className="home__section__common-questions__container__accordion__item__body">
                Non, le service de prise en charge des véhicules Paark est
                disponible uniquement dans Paris.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              className="home__section__common-questions__container__accordion__item"
              eventKey="4"
            >
              <Accordion.Header className="home__section__common-questions__container__accordion__item__header">
                Que se passe-t-il en cas de sinistre ?
              </Accordion.Header>
              <Accordion.Body className="home__section__common-questions__container__accordion__item__body">
                L’activité exercée par Paark est assurée par notre partenaire{" "}
                <Image
                  className="home__section__common-questions__container__accordion__item__body__insurance"
                  src={paark_assurance}
                  rounded
                />{" "}
                notoirement solvables couvrant les risques liés à son activité
                conformément à la législation en vigueur et en particulier : Les
                garanties acquises comprennent la responsabilité civile
                professionnelle de Paark ainsi que les dommages subis par les
                véhicules confiés.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              className="home__section__common-questions__container__accordion__item"
              eventKey="5"
            >
              <Accordion.Header className="home__section__common-questions__container__accordion__item__header">
                J’ai du retard sur le lieu de prise en charge ?
              </Accordion.Header>
              <Accordion.Body className="home__section__common-questions__container__accordion__item__body">
                Pas de soucis, en cas de retard votre voiturier vous contactera
                pour connaître votre heure d'arrivée finale.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              className="home__section__common-questions__container__accordion__item"
              eventKey="6"
            >
              <Accordion.Header className="home__section__common-questions__container__accordion__item__header">
                Comment je récupère mon véhicule ?
              </Accordion.Header>
              <Accordion.Body className="home__section__common-questions__container__accordion__item__body">
                C'est simple, cliquer sur le bouton "Récupérer mon véhicule" et
                indiquer votre position ainsi que votre numéro de téléphone, le
                même qui a servi pour la réservation.
                <br />
                Vous recevrez alors une notification par SMS vous confirmant que
                votre véhicule est en route vers votre position
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              className="home__section__common-questions__container__accordion__item"
              eventKey="7"
            >
              <Accordion.Header className="home__section__common-questions__container__accordion__item__header">
                En combien de temps je récupère mon véhicule ?
              </Accordion.Header>
              <Accordion.Body className="home__section__common-questions__container__accordion__item__body">
                Avec Paark votre véhicule peut vous être rendu n'importe où dans
                Paris, mais sera toujours garé aux alentours du point de prise
                en charge. <br />
                Cela étant dit, la restitution de votre véhicule peut varier de
                5 à 20 mins maximum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              className="home__section__common-questions__container__accordion__item"
              eventKey="8"
            >
              <Accordion.Header className="home__section__common-questions__container__accordion__item__header">
                Je possède un abonnement pour un parking ?
              </Accordion.Header>
              <Accordion.Body className="home__section__common-questions__container__accordion__item__body">
                Si vous possédez un abonnement pour un parking, n'hésitez pas à
                le remettre à votre voituirer qui stationnera votre véhicule
                dans le parking approprié.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              className="home__section__common-questions__container__accordion__item"
              eventKey="9"
            >
              <Accordion.Header className="home__section__common-questions__container__accordion__item__header">
                Comment je régles mon stationnement ?
              </Accordion.Header>
              <Accordion.Body className="home__section__common-questions__container__accordion__item__body">
                Le stationnement en voirie ou dans un parking de votre véhicule
                est à régler avec votre voiturier à la remise des clés. À ce
                moment-là, il vous remettra le ticket de stationnement avec
                toutes les informations nécessaires inscrites dessus. <br />
                <br />
                Les paiements acceptés sont : {"  "}
                <br />
                <Image
                  className="home__section__common-questions__container__accordion__item__body__insurance__cb"
                  src={cb}
                  rounded
                />
                {"  "},{"  "}
                <Image
                  className="home__section__common-questions__container__accordion__item__body__insurance"
                  src={paypal}
                  rounded
                />
                {"  "},{"  "}
                <Image
                  className="home__section__common-questions__container__accordion__item__body__insurance__apple-pay"
                  src={applePay}
                  rounded
                />
                {"  "},{"  "}
                <Image
                  className="home__section__common-questions__container__accordion__item__body__insurance"
                  src={lydia}
                  rounded
                />
                {"  "},{"  "}
                <Image
                  className="home__section__common-questions__container__accordion__item__body__insurance__tether"
                  src={tether}
                  rounded
                />
                {"  "}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
