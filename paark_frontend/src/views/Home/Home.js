import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import paark_home from "../../assets/images/paark_home.jpg";
import "./Home.scss";

const Home = () => {
  return (
    <Container className="home">
      <Row className="home__headlines">
        <Row className="home__headlines__headline">
          Service de voiturier à la demande.
        </Row>
        <Row className="home__headlines__sub-headline">
          Utilisez Paark pour le travail, la maison ou les loisirs : rapide,
          abordable et pratique.
        </Row>
      </Row>
      <Row className="home__image">
        <Image className="home__image__paark-home" src={paark_home} rounded />
      </Row>
    </Container>
  );
};

export default Home;
