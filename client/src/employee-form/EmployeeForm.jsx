import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

function EmployeeForm() {
  const location = useLocation();
  const imployeeId = location.state;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (imployeeId) {
      fetchEmployeeData(imployeeId);
    }
  }, [imployeeId]);

  const fetchEmployeeData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/employee/${id}`
      );
      const { firstname, lastname, email, phone, gender } =
        response.data.employee;
      setFormData({ firstname, lastname, email, phone, gender });
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const schema = Yup.object().shape({
        firstname: Yup.string().required("First Name is required"),
        lastname: Yup.string().required("Last Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        phone: Yup.string()
          .matches(/^(\+94|0)?(7[1-9]\d{7}|0\d{9})$/, "Invalid phone number")
          .required("Phone No is required"),
        gender: Yup.string().required("Gender is required"),
      });

      await schema.validate(formData, { abortEarly: false });

      let response;
      if (imployeeId) {
        // Update existing employee
        response = await axios.put(
          `http://localhost:3000/api/employee/${imployeeId}`,
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
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((fieldError) => {
          newErrors[fieldError.path] = fieldError.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="title">
        <h3>The Employee Manager </h3>
      </div>
      <div className="form-container">
        <div className="form-text">
          <h5 className=" fw-bold">{imployeeId ? "Update" : "Add"} Employee</h5>
        </div>
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
            />
            {errors.firstname && (
              <div className="invalid-feedback">{errors.firstname}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
            />
            {errors.lastname && (
              <div className="invalid-feedback">{errors.lastname}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`form-control ${errors.gender ? "is-invalid" : ""}`}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <div className="invalid-feedback">{errors.gender}</div>
            )}
          </div>
          <div className="btn-submit">
            <button type="submit" className="cust-btn submit-btn">
              {imployeeId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
