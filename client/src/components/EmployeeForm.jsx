import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function EmployeeForm() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
  });

  console.log(data);

  useEffect(() => {
    if (data) {
      fetchEmployeeData(data);
    }
  }, [data]);

  const fetchEmployeeData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/employee/${id}`
      );
      console.log(response.data.employee);
      const { firstname, lastname, email, phone, gender } =
        response.data.employee;
      setFormData({ firstname, lastname, email, phone, gender });
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  console.log(formData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (data) {
        // Update existing employee
        response = await axios.put(
          `http://localhost:3000/api/employee/${data}`,
          formData
        );
        navigate("/");
      } else {
        // Create new employee
        response = await axios.post(
          "http://localhost:3000/api/employee",
          formData
        );
        navigate("/");
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="employee-form">
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-control"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </form>
        <button type="submit" className="btn btn-primary">
          {data ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
