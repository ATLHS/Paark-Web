import { useContext } from "react";
import AuthApi from "../../../context/AuthApi";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import PublicNav from "../PublicNav/PublicNav";
import AdminNav from "../AdminNav/AdminNav";
import "./Navigation.scss";

const Navigation = () => {
  const { auth } = useContext(AuthApi);

  return (
    <Navbar collapseOnSelect className="navigation" expand="lg">
      <Container className="navigation__container">
        {!auth ? <PublicNav /> : <AdminNav />}
      </Container>
    </Navbar>
  );
};

export default Navigation;
