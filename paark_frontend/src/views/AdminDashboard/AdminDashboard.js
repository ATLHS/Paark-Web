import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthApi from "../../context/AuthApi";
import constStatus from "../../constants/status";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Nav from "react-bootstrap/Nav";
import rideServices from "../../services/ride";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const { user } = useContext(AuthApi);

  const [initialRace, setInitialRace] = useState();
  const [statusesLenth, setStatusesLenth] = useState({});
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    rideServices
      .getAllride()
      .then((res) => res)
      .then((data) => {
        setUsers(data.test);
        setInitialRace(data.test);

        data.test.forEach((race) => {
          if (race.status in statusesLenth) {
            statusesLenth[race.status] = statusesLenth[race.status] + 1;
            return;
          }
          statusesLenth[race.status] = 1;
        });

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

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
  const getAllOptions = () => setUsers(initialRace);

  const getResgisteredOptions = () =>
    setUsers(
      initialRace.filter((user) => user.status === constStatus.REGISTERED)
    );

  const getOnGoingOptions = () =>
    setUsers(initialRace.filter((user) => user.status === constStatus.ONGOING));

  const getPickedupOptions = () =>
    setUsers(
      initialRace.filter((user) => user.status === constStatus.PICKEDUP)
    );

  const getReturnedOptions = () =>
    setUsers(
      initialRace.filter((user) => user.status === constStatus.RETURNED)
    );

  const allStatusLength = () =>
    Object.values(statusesLenth).reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

  return (
    <Container className="admin-dashboard">
      <Row className="admin-dashboard__container">
        <Col className="admin-dashboard__container__table">
          <Row className="admin-dashboard__container__table__nav">
            <Nav className="admin-dashboard__container__table__nav__base-nav">
              <Nav.Item className="admin-dashboard__container__table__nav__base-nav__items">
                <Nav.Link
                  onClick={getAllOptions}
                  className="admin-dashboard__container__table__nav__base-nav__item"
                >
                  Tous ({allStatusLength()})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="admin-dashboard__container__table__nav__base-nav__items">
                <Nav.Link
                  onClick={getResgisteredOptions}
                  className="admin-dashboard__container__table__nav__base-nav__item"
                >
                  Enregistré ({statusesLenth[constStatus.REGISTERED]})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="admin-dashboard__container__table__nav__base-nav__items">
                <Nav.Link
                  onClick={getOnGoingOptions}
                  className="admin-dashboard__container__table__nav__base-nav__item"
                >
                  En chemin ({statusesLenth[constStatus.ONGOING]})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="admin-dashboard__container__table__nav__base-nav__items">
                <Nav.Link
                  onClick={getPickedupOptions}
                  className="admin-dashboard__container__table__nav__base-nav__item"
                >
                  Pris en charge ({statusesLenth[constStatus.PICKEDUP]})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="admin-dashboard__container__table__nav__base-nav__items">
                <Nav.Link
                  onClick={getReturnedOptions}
                  className="admin-dashboard__container__table__nav__base-nav__item"
                >
                  Terminée ({statusesLenth[constStatus.RETURNED]})
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
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
          {!isLoading &&
            users.map((user) => (
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
