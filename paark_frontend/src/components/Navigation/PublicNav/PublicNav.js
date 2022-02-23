import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./PublicNav.scss";

const PublicNav = () => {
  return (
    <>
      <Navbar.Brand as={Link} className="public-nav__brand" to="/">
        PAARK
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="public-nav__collapse">
        <Navbar.Text>Contact</Navbar.Text>
      </Navbar.Collapse>
    </>
  );
};

export default PublicNav;
