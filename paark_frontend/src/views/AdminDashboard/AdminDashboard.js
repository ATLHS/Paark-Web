import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import AuthApi from "../../context/AuthApi";
import constStatus from "../../constants/status";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Nav from "react-bootstrap/Nav";
import rideServices from "../../services/ride";
import userServices from "../../services/user";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  // const { user } = useContext(AuthApi);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [initialUsers, setInitialUser] = useState([]);
  const [statusesLength, setStatusesLength] = useState({});
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    rideServices
      .getAllride()
      .then((res) => res)
      .then((data) => {
        data.user.forEach((user) => {
          if (user.rides.length) {
            setUsers((prevUsers) => [...prevUsers, user]);
            setInitialUser((prevUsers) => [...prevUsers, user]);
            if (user.rides[0].status in statusesLength) {
              statusesLength[user.rides[0].status] =
                statusesLength[user.rides[0].status] + 1;
              return;
            }
            statusesLength[user.rides[0].status] = 1;
          }
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

  const getOptions = (user) => {
    switch (user.rides[0].status) {
      case "En chemin":
        return (
          <Dropdown.Item
            eventKey={constStatus.PICKEDUP}
            as="button"
            onClick={() =>
              updateRideStatus(user.rides[0]._id, constStatus.PICKEDUP)
            }
          >
            {constStatus.PICKEDUP}
          </Dropdown.Item>
        );
      case "Pris en charge":
        return (
          <Dropdown.Item
            eventKey={constStatus.RETURNED}
            as="button"
            onClick={() =>
              updateRideStatus(user.rides[0]._id, constStatus.RETURNED)
            }
          >
            {constStatus.RETURNED}
          </Dropdown.Item>
        );
      default:
        return;
    }
  };

  const updateRideStatus = (rideId, status) => {
    setIsLoading(true);
    userServices
      .updateUserRideStatus(rideId, status)
      .then((res) => res)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const setTitle = (prevStatus, newStatus, id) => {
    const updatedUsers = users.map((user) => {
      if (user._id === id) {
        user.rides[0].status = newStatus;
      }
      return user;
    });

    if (statusesLength[prevStatus] === 1) {
      statusesLength[prevStatus] = "";
    } else {
      statusesLength[prevStatus] = -1;
    }
    if (newStatus in statusesLength) {
      statusesLength[newStatus] = statusesLength[newStatus] + 1;
      return;
    } else {
      statusesLength[newStatus] = 1;
    }

    setUsers(updatedUsers);
  };
  const getAllOptions = () => setUsers(initialUsers);

  const getResgisteredOptions = () =>
    setUsers(
      initialUsers.filter(
        (user) => user.rides[0].status === constStatus.REGISTERED
      )
    );

  const getOnGoingOptions = () =>
    setUsers(
      initialUsers.filter(
        (user) => user.rides[0].status === constStatus.ONGOING
      )
    );

  const getPickedupOptions = () =>
    setUsers(
      initialUsers.filter(
        (user) => user.rides[0].status === constStatus.PICKEDUP
      )
    );

  const getReturnedOptions = () =>
    setUsers(
      initialUsers.filter(
        (user) => user.rides[0].status === constStatus.RETURNED
      )
    );

  const allStatusLength = () => {
    return Object.values(statusesLength)
      .filter((status) => status !== "")
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  };

  return (
    <Container className="admin-dashboard">
      <Row className="admin-dashboard__container">
        {!isMobile ? (
          <Col className="admin-dashboard__container__table">
            <Row className="admin-dashboard__container__table__nav">
              <Nav className="admin-dashboard__container__table__nav__base-nav">
                <Nav.Item className="admin-dashboard__container__table__nav__base-nav__items">
                  <Nav.Link
                    onClick={getAllOptions}
                    className="admin-dashboard__container__table__nav__base-nav__item"
                  >
                    Tous {allStatusLength()}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="admin-dashboard__container__table__nav__base-nav__items">
                  <Nav.Link
                    onClick={users ? getResgisteredOptions : null}
                    className="admin-dashboard__container__table__nav__base-nav__item"
                  >
                    Enregistré {statusesLength[constStatus.REGISTERED]}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="admin-dashboard__container__table__nav__base-nav__items">
                  <Nav.Link
                    onClick={users ? getOnGoingOptions : null}
                    className="admin-dashboard__container__table__nav__base-nav__item"
                  >
                    En chemin {statusesLength[constStatus.ONGOING]}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="admin-dashboard__container__table__nav__base-nav__items">
                  <Nav.Link
                    onClick={users ? getPickedupOptions : null}
                    className="admin-dashboard__container__table__nav__base-nav__item"
                  >
                    Pris en charge {statusesLength[constStatus.PICKEDUP]}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="admin-dashboard__container__table__nav__base-nav__items">
                  <Nav.Link
                    onClick={users ? getReturnedOptions : null}
                    className="admin-dashboard__container__table__nav__base-nav__item"
                  >
                    Terminée {statusesLength[constStatus.RETURNED]}
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
                  HEURE D'ARRIVÉ
                </Col>
                <Col className="admin-dashboard__container__table__header__tabs__tab">
                  CODE DE PRISE EN CHARGE
                </Col>
                {/* <Col className="admin-dashboard__container__table__header__tabs__tab">
                  LIEU DE STATIONNEMENT
                </Col> */}
                <Col className="admin-dashboard__container__table__header__tabs__tab">
                  ADERESSE DE RETOUR
                </Col>
                <Col className="admin-dashboard__container__table__header__tabs__tab">
                  CODE DE RESTITUTION
                </Col>
                <Col className="admin-dashboard__container__table__header__tabs__tab">
                  NUMÉRO DE TÉLÉPHONE
                </Col>
                <Col className="admin-dashboard__container__table__header__tabs__tab">
                  STATUS
                </Col>
              </Row>
            </Row>
            {!isLoading && users
              ? users.map((user) => (
                  <Row
                    key={user._id}
                    className="admin-dashboard__container__table__body"
                  >
                    <Row className="admin-dashboard__container__table__body__race">
                      <Col className="admin-dashboard__container__table__body__race__info">
                        {user.firstname}
                      </Col>
                      <Col className="admin-dashboard__container__table__body__race__info">
                        {user.rides[0].dropOffLocation}
                      </Col>
                      <Col className="admin-dashboard__container__table__body__race__info">
                        {user.rides[0].dropOffTime}
                      </Col>
                      <Col className="admin-dashboard__container__table__body__race__info">
                        {user.rides[0].dropOffCode}
                      </Col>
                      {/* <Col className="admin-dashboard__container__table__body__race__info">
                        {user.rides[0].parkingArea}
                      </Col> */}
                      <Col className="admin-dashboard__container__table__body__race__info">
                        {user.rides[0].dropBackLocation || "-"}
                      </Col>
                      <Col className="admin-dashboard__container__table__body__race__info">
                        {user.rides[0].dropBackCode}
                      </Col>
                      <Col className="admin-dashboard__container__table__body__race__info">
                        {user.phone}
                      </Col>
                      <Col className="admin-dashboard__container__table__body__race__info">
                        <DropdownButton
                          className={`admin-dashboard__container__table__body__race__info__selector-status ${
                            user.rides[0].status === constStatus.RETURNED ||
                            user.rides[0].status === constStatus.REGISTERED
                              ? "hide"
                              : ""
                          }`}
                          title={user.rides[0].status}
                          variant={getVariantStatus(user.rides[0].status)}
                          disabled={
                            user.rides[0].status === constStatus.RETURNED ||
                            user.rides[0].status === constStatus.REGISTERED
                          }
                          onSelect={(eventKey) =>
                            setTitle(user.rides[0].status, eventKey, user._id)
                          }
                        >
                          {getOptions(user)}
                        </DropdownButton>
                      </Col>
                    </Row>
                  </Row>
                ))
              : ""}
          </Col>
        ) : (
          <>
            <Accordion className="admin-dashboard__container__filter" flush>
              <Accordion.Item
                eventKey="0"
                className="admin-dashboard__container__filter__items"
              >
                <Accordion.Header className="admin-dashboard__container__filter__items__header">
                  Filtres
                </Accordion.Header>
                <Accordion.Body bsPrefix="admin-dashboard__container__filter__items__body">
                  <Button
                    className="m-1"
                    variant="outline-dark"
                    size="sm"
                    onClick={getAllOptions}
                  >
                    Tous {allStatusLength()}
                  </Button>
                  <Button
                    className="m-1"
                    variant="outline-dark"
                    size="sm"
                    onClick={users ? getResgisteredOptions : null}
                  >
                    Enregistré {statusesLength[constStatus.REGISTERED]}
                  </Button>
                  <Button
                    className="m-1"
                    variant="outline-dark"
                    size="sm"
                    onClick={users ? getOnGoingOptions : null}
                  >
                    En chemin {statusesLength[constStatus.ONGOING]}
                  </Button>
                  <Button
                    className="m-1"
                    variant="outline-dark"
                    size="sm"
                    onClick={users ? getPickedupOptions : null}
                  >
                    Pris en charge {statusesLength[constStatus.PICKEDUP]}
                  </Button>
                  <Button
                    className="m-1"
                    variant="outline-dark"
                    size="sm"
                    onClick={users ? getReturnedOptions : null}
                  >
                    Terminée {statusesLength[constStatus.RETURNED]}
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {!isLoading && users
              ? users.map((user) => (
                  <Col
                    key={user._id}
                    className="admin-dashboard__container__mobile"
                  >
                    <Card
                      className="admin-dashboard__container__mobile__card"
                      style={{ width: "18rem" }}
                    >
                      <Card.Body className="admin-dashboard__container__mobile__card__body">
                        <Card.Title className="admin-dashboard__container__mobile__card__body__title">
                          {user.firstname}
                        </Card.Title>
                        <Row className="admin-dashboard__container__mobile__card__body__container">
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__drop-off">
                            Dépôt :
                          </Card.Text>
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__address">
                            {user.rides[0].dropOffLocation}
                          </Card.Text>
                        </Row>
                        <Row className="admin-dashboard__container__mobile__card__body__container">
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__drop-off-hour">
                            Heure d'arrivé :
                          </Card.Text>
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__hour">
                            {user.rides[0].dropOffTime}
                          </Card.Text>
                        </Row>
                        <Row className="admin-dashboard__container__mobile__card__body__container">
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__drop-off-code">
                            Code de prise en charge :
                          </Card.Text>
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__code">
                            {user.rides[0].dropOffCode || "-"}
                          </Card.Text>
                        </Row>
                        {/* <Row className="admin-dashboard__container__mobile__card__body__container">
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__drop-off-code">
                            Lieu de stationnement :
                          </Card.Text>
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__code">
                            {user.rides[0].parkingArea || "-"}
                          </Card.Text>
                        </Row> */}
                        <Row className="admin-dashboard__container__mobile__card__body__container">
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__drop-back">
                            Retour :
                          </Card.Text>
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__address">
                            {user.rides[0].dropBackLocation || "-"}
                          </Card.Text>
                        </Row>
                        <Row className="admin-dashboard__container__mobile__card__body__container">
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__drop-back-code">
                            Code de restitution :
                          </Card.Text>
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__code">
                            {user.rides[0].dropBackCode || "-"}
                          </Card.Text>
                        </Row>
                        <Row className="admin-dashboard__container__mobile__card__body__container">
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__phone">
                            Tél :
                          </Card.Text>
                          <Card.Text className="admin-dashboard__container__mobile__card__body__container__number">
                            {user.phone}
                          </Card.Text>
                        </Row>
                        <Row className="admin-dashboard__container__mobile__card__body__actions">
                          <Col className="admin-dashboard__container__mobile__card__body__action">
                            <DropdownButton
                              className={`admin-dashboard__container__mobile__card__body__action__selector-status ${
                                user.rides[0].status === constStatus.RETURNED ||
                                user.rides[0].status === constStatus.REGISTERED
                                  ? "hide"
                                  : ""
                              }`}
                              title={user.rides[0].status}
                              variant={getVariantStatus(user.rides[0].status)}
                              disabled={
                                user.rides[0].status === constStatus.RETURNED ||
                                user.rides[0].status === constStatus.REGISTERED
                              }
                              onSelect={(eventKey) =>
                                setTitle(
                                  user.rides[0].status,
                                  eventKey,
                                  user._id
                                )
                              }
                            >
                              {getOptions(user)}
                            </DropdownButton>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              : ""}
          </>
        )}
      </Row>
    </Container>
  );
};

export default AdminDashboard;
