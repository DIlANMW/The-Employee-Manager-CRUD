import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./home/Employees";
import EmployeeForm from "./employee-form/EmployeeForm";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Employees />} />
      </Routes>
      <Routes>
        <Route path="/employeeform" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
};

export default App;
