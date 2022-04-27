import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation/Navigation";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import Footer from "./components/Footer/Footer";
import Booking from "./views/Booking/Booking";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import AdminSignup from "./views/AdminSignup/AdminSignup";
import AdminDashboard from "./views/AdminDashboard/AdminDashboard";
import GetCar from "./views/GetCar/GetCar";
import AuthApi from "./context/AuthApi";
import authService from "./services/auth";
import PaymentConfirmed from "./views/PaymentConfirmed/PaymentConfirmed";
import Contact from "./views/Contact/Contact";
import ReturningCarConfirmation from "./views/ReturningCarConfirmation/ReturningCarConfirmation";
import TermsOfUse from "./views/TermsOfUse/TermsOfUse";
import RGPD from "./views/RGPD/RGPD";
import Cookies from "./views/Cookies/Cookies";
import Home from "./views/Home/Home";

const App = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    authService
      .isLoggedIn()
      .then((res) => res)
      .then((data) => {
        setAuth(data.isAuth);
        setUser(data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setAuth(err.isAuth);
      });
  }, [auth]);

  return (
    <BrowserRouter>
      <AuthApi.Provider value={{ auth, setAuth, setUser, user }}>
        <Navigation />
        {!isLoading && (
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />
            <Route
              path="/get-valet"
              element={
                <PublicRoute>
                  <Booking />
                </PublicRoute>
              }
            />
            <Route
              path="/get-car"
              element={
                <PublicRoute>
                  <GetCar />
                </PublicRoute>
              }
            />
            <Route
              path="/payment-confirmed"
              element={
                <PublicRoute>
                  <PaymentConfirmed />
                </PublicRoute>
              }
            />
            <Route
              path="/returning-car-confirmation"
              element={
                <PublicRoute>
                  <ReturningCarConfirmation />
                </PublicRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicRoute>
                  <Contact />
                </PublicRoute>
              }
            />
            <Route
              path="/admin/login"
              element={
                <PublicRoute>
                  <AdminLogin />
                </PublicRoute>
              }
            />
            <Route
              path="/admin/signup"
              element={
                <PublicRoute>
                  <AdminSignup />
                </PublicRoute>
              }
            />
            <Route
              path="/term-of-use"
              element={
                <PublicRoute>
                  <TermsOfUse />
                </PublicRoute>
              }
            />
            <Route
              path="/rgpd"
              element={
                <PublicRoute>
                  <RGPD />
                </PublicRoute>
              }
            />
            <Route
              path="/cookies"
              element={
                <PublicRoute>
                  <Cookies />
                </PublicRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        )}
        {!auth ? <Footer /> : ""}
      </AuthApi.Provider>
    </BrowserRouter>
  );
};

export default App;
