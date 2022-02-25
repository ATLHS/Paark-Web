import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthApi from "../../context/AuthApi";
import constStatus from "../../constants/status";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const { user } = useContext(AuthApi);

  const [users, setUsers] = useState([
    {
      id: 0,
      firstname: "Mila",
      tel: "0624557510",
      dropOffLocation: "1 place du frommage",
      dropOffTime: "16h00",
      status: "Pris en charge",
    },
    {
      id: 1,
      firstname: "Pistache",
      tel: "0624557510",
      dropOffLocation: "5 rue des pistaches",
      dropOffTime: "14h00",
      status: "En chemin",
    },
    {
      id: 2,
      firstname: "Grizou",
      tel: "0624557510",
      dropOffLocation: "24 rue du sommeil",
      dropOffTime: "13h30",
      status: "En chemin",
    },
    {
      id: 3,
      firstname: "Scarlett",
      tel: "0624557510",
      dropOffLocation: "2 rue des relous",
      dropOffTime: "20h40",
      status: "Terminée",
    },
    {
      id: 4,
      firstname: "Django",
      tel: "0624557510",
      dropOffLocation: "place de la boulangerie",
      dropOffTime: "18hh10",
      status: "Enregistré",
    },
    {
      id: 6,
      firstname: "Hermione",
      tel: "0624557510",
      dropOffLocation: "2 rue des relous",
      dropOffTime: "22h00",
      status: "En chemin",
    },
    {
      id: 5,
      firstname: "Guapo",
      tel: "0624557510",
      dropOffLocation: "1 place dou brazil",
      dropOffTime: "8h00",
      status: "Pris en charge",
    },
  ]);

  const getVariantStatus = (status) => {
    switch (status) {
      case constStatus.ONGOING:
        return "primary";
      case constStatus.PICKEDUP:
        return "warning";
      case constStatus.REGISTERED:
        return "secondary";
      case constStatus.RETURNED:
        return "success";
      default:
        return;
    }
  };

  const getOptions = (status) => {
    switch (status) {
      case "En chemin":
        return (
          <Dropdown.Item eventKey={constStatus.PICKEDUP} as="button">
            {constStatus.PICKEDUP}
          </Dropdown.Item>
        );
      case "Pris en charge":
        return (
          <Dropdown.Item eventKey={constStatus.RETURNED} as="button">
            {constStatus.RETURNED}
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
                      user.status === constStatus.RETURNED ||
                      user.status === constStatus.REGISTERED
                        ? "hide"
                        : ""
                    }`}
                    title={user.status}
                    variant={getVariantStatus(user.status)}
                    disabled={
                      user.status === constStatus.RETURNED ||
                      user.status === constStatus.REGISTERED
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
