import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./PublicNav.scss";

const PublicNav = () => {
  return (
    <>
      <Navbar.Brand as={Link} className="public-nav__brand" to="/">
        PAARK
      </Navbar.Brand>
      <Navbar.Toggle className="public-nav__toggle" />
      {/* desktop navbar */}
      <Navbar.Collapse
        className="public-nav__desktop"
        id="responsive-navbar-nav"
      >
        <Nav className="public-nav__desktop__navbar">
          <Nav.Link className="public-nav__desktop__navbar__link" href="#">
            Questions fréquentes
          </Nav.Link>
          {/* <Nav.Link
            className="public-nav__desktop__navbar__link"
            href="/contact"
          >
            Nous contacter
          </Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
      {/* mobile navbar */}
      <Navbar.Offcanvas className="public-nav__mobile" placement="bottom">
        <Offcanvas.Header
          className="public-nav__mobile__header"
          closeButton
        ></Offcanvas.Header>
        <Offcanvas.Body className="public-nav__mobile__body">
          <Nav className="public-nav__mobile__body__nav">
            <Nav.Link
              className="public-nav__mobile__body__nav__link"
              href="/get-valet"
            >
              Réservez un voiturier
            </Nav.Link>
            <Nav.Link
              className="public-nav__mobile__body__nav__link"
              href="/get-car"
            >
              Récupérer mon véhicule
            </Nav.Link>
            <Nav.Link className="public-nav__mobile__body__nav__link" href="/">
              Questions fréquentes
            </Nav.Link>
            {/* <Nav.Link
              className="public-nav__mobile__body__nav__link"
              href="/contact"
            >
              Nous contacter
            </Nav.Link> */}
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </>
  );
};

export default PublicNav;
