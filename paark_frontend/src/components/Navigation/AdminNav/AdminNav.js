import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
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
          <Navbar.Brand className="admin-nav__avatar">
            USERNAME : {user.email}
          </Navbar.Brand>
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
