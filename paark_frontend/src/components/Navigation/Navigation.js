import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <Navbar className="navigation">
      <Container className="navigation__container">
        <Navbar.Brand as={Link} className="navigation__container__brand" to="/">
          PAARK
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="navigation__container__collapse">
          <Navbar.Text>Contact</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
