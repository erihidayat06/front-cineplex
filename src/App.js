import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PurchaseProvider } from "./components/PurchaseContext";
import Cine from "./Pages/Cine";
import SeatBuy from "./Pages/SeatBuy";
import Schedule from "./Pages/Schedule";
import MadSchedule from "./Pages/MadSchedule";
import CivilSchedule from "./Pages/CivilSchedule";
import CashSchedule from "./Pages/CashSchedule";
import MyProfil from "./Pages/MyProfil";
import Signin from "./Pages/Signin";
import Register from "./components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <PurchaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Cine />} />
          <Route path="/SeatBuy/:id" element={<SeatBuy />} />
          <Route path="/Schedule/:id" element={<Schedule />} />
          <Route path="/MadSchedule" element={<MadSchedule />} />
          <Route path="/CivilSchedule" element={<CivilSchedule />} />
          <Route path="/CashSchedule" element={<CashSchedule />} />
          <Route path="/MyProfil" element={<MyProfil />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </PurchaseProvider>
  );
};

export default App;
