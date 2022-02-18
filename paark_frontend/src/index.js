import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./views/Home/Home";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Booking from "./views/Booking/Booking";
import GetCar from "./views/GetCar/GetCar";
import PaymentConfirmed from "./views/PaymentConfirmed/PaymentConfirmed";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/get-valet" element={<Booking />}></Route>
        <Route path="/get-car" element={<GetCar />}></Route>
        <Route path="/payment-confirmed" element={<PaymentConfirmed />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
