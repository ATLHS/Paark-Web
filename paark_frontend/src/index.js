import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./views/Home/Home";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Booking from "./views/Booking/Booking";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
