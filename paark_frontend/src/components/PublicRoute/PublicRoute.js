import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthApi from "../../context/AuthApi";

const PublicRoute = ({ children }) => {
  const authAPi = useContext(AuthApi);
  const isAuthorized = authAPi.auth;
  return !isAuthorized ? children : <Navigate to="/admin/dashboard" />;
};

export default PublicRoute;
