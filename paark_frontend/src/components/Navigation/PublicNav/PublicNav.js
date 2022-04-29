import { useState } from "react";
import { scroller } from "react-scroll";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./PublicNav.scss";

const PublicNav = () => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  return (
    <>
      <Navbar.Brand as={Link} className="public-nav__brand" to="/">
        PAARK
      </Navbar.Brand>
      <Navbar.Toggle
        onClick={() => setShowOffCanvas(true)}
        className="public-nav__toggle"
      />
      {/* desktop navbar */}
      <Navbar.Collapse
        className="public-nav__desktop"
        id="responsive-navbar-nav"
      >
        <Nav className="public-nav__desktop__navbar">
          <Nav.Link
            className="public-nav__desktop__navbar__link"
            href="#"
            onClick={() =>
              scroller.scrollTo("home__common-questions", {
                duration: 200,
                delay: 0,
                smooth: "easeInQuint",
              })
            }
          >
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
      <Navbar.Offcanvas
        show={showOffCanvas}
        className="public-nav__mobile"
        placement="bottom"
      >
        <Offcanvas.Header
          className="public-nav__mobile__header"
          closeButton
          onClick={() => setShowOffCanvas(false)}
        ></Offcanvas.Header>
        <Offcanvas.Body className="public-nav__mobile__body">
          <Nav className="public-nav__mobile__body__nav">
            <Nav.Link className="public-nav__mobile__body__nav__link" href="/">
              Accueil
            </Nav.Link>
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
            <Nav.Link
              className="public-nav__mobile__body__nav__link"
              onClick={() => {
                setShowOffCanvas(false);
                scroller.scrollTo("home__common-questions", {
                  duration: 500,
                  delay: 0,
                  smooth: "easeInQuint",
                });
              }}
            >
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
