import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import AuthApi from "../../../context/AuthApi";
import Nav from "react-bootstrap/Nav";
import authService from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import "./AdminNav.scss";

const AdminNav = () => {
  let navigate = useNavigate();
  const { user, setAuth } = useContext(AuthApi);

  const handleSignOut = () => {
    authService
      .handleSignOut()
      .then((res) => res)
      .then((data) => {
        setAuth(data.isAuth);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {user ? (
        <>
          <Nav>
            <Nav.Item style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
              <Nav.Link>{`user name`}</Nav.Link>
            </Nav.Item>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="admin-nav__collapse">
            <Nav>
              <Nav.Item>
                <Nav.Link onClick={handleSignOut}>Deconnexion</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AdminNav;
