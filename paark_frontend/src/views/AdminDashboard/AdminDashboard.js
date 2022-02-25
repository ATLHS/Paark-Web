import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthApi from "../../context/AuthApi";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const { user } = useContext(AuthApi);

  const [users, setUsers] = useState();

  const getVariantStatus = (status) => {
    switch (status) {
      case "En chemin":
        return "primary";
      case "Pris en charge":
        return "warning";
      case "Enregistré":
        return "secondary";
      case "Terminer":
        return "success";
      default:
        return;
    }
  };

  const getOptions = (status) => {
    switch (status) {
      case "En chemin":
        return (
          <Dropdown.Item eventKey={"Pris en charge"} as="button">
            Pris en charge
          </Dropdown.Item>
        );
      case "Pris en charge":
        return (
          <Dropdown.Item eventKey={"Terminer"} as="button">
            Terminer
          </Dropdown.Item>
        );
      default:
        return;
    }
  };

  const setTitle = (newStatus, id) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        user.status = newStatus;
      }
      return user;
    });

    setUsers(updatedUsers);
  };
  return (
    <Container className="admin-dashboard">
      <Row className="admin-dashboard__container">
        <Col className="admin-dashboard__container__table">
          <Row className="admin-dashboard__container__table__header">
            <Row className="admin-dashboard__container__table__header__tabs">
              <Col className="admin-dashboard__container__table__header__tabs__tab">
                PRÉNOM
              </Col>
              <Col className="admin-dashboard__container__table__header__tabs__tab">
                ADRESSE D'ARRIVÉE
              </Col>
              <Col className="admin-dashboard__container__table__header__tabs__tab">
                HUERE D'ARRIVÉ
              </Col>
              <Col className="admin-dashboard__container__table__header__tabs__tab">
                ADERESSE DE RETOUR
              </Col>
              <Col className="admin-dashboard__container__table__header__tabs__tab">
                NUMÉRO DE TÉLÉPHONE
              </Col>
              <Col className="admin-dashboard__container__table__header__tabs__tab">
                STATUS
              </Col>
            </Row>
          </Row>
          {users.map((user) => (
            <Row
              key={user.id}
              className="admin-dashboard__container__table__body"
            >
              <Row className="admin-dashboard__container__table__body__race">
                <Col className="admin-dashboard__container__table__body__race__info">
                  {user.firstname}
                </Col>
                <Col className="admin-dashboard__container__table__body__race__info">
                  {user.dropOffLocation}
                </Col>
                <Col className="admin-dashboard__container__table__body__race__info">
                  {user.dropOffTime}
                </Col>
                <Col className="admin-dashboard__container__table__body__race__info">
                  -
                </Col>
                <Col className="admin-dashboard__container__table__body__race__info">
                  {user.tel}
                </Col>
                <Col className="admin-dashboard__container__table__body__race__info">
                  <DropdownButton
                    className={`admin-dashboard__container__table__body__race__info__selector-status ${
                      user.status === "Terminer" || user.status === "Enregistré"
                        ? "hide"
                        : ""
                    }`}
                    title={user.status}
                    variant={getVariantStatus(user.status)}
                    disabled={
                      user.status === "Terminer" || user.status === "Enregistré"
                    }
                    onSelect={(eventKey) => setTitle(eventKey, user.id)}
                  >
                    {getOptions(user.status)}
                  </DropdownButton>
                </Col>
              </Row>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
