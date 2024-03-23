import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Employees = () => {
  const [empData, setEmpData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employee")
      .then((result) => setEmpData(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    navigate("/employeeform", { state: id });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/employee/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <Link to="/employeeform" className="btn btn-dark">
        Add Employee +
      </Link>
      <div className="row">
        {empData.employees?.map((employee) => (
          <div className="card bg-light-subtle" key={employee._id}>
            <div className="card-body">
              <div className="text-section">
                <h5 className="card-title fw-bold">{employee.firstname}</h5>
                <h5 className="card-title fw-bold">{employee.lastname}</h5>
                <p className="card-text">{employee.email}</p>
                <p className="card-text">{employee.phone}</p>
                <p className="card-text">{employee.gender}</p>
              </div>
              <div className="cta-section">
                <button
                  onClick={() => handleEdit(employee._id)}
                  className="btn btn-dark"
                >
                  Edit
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
