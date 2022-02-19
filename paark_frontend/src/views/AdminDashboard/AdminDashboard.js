import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  let navigate = useNavigate();
  return (
    <Container className="admin-dashboard">
      <Row className="">
        <Col className=""></Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
