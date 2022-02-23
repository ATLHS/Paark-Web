import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthApi from "../../context/AuthApi";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const { admin } = useContext(AuthApi);
  return (
    <Container className="admin-dashboard">
      <Row>
        <Col>Dashboard</Col>
        <Col>Bonjour {admin.email}</Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
