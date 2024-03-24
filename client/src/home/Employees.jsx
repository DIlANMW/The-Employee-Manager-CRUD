import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";

const Employees = () => {
  const [empData, setEmpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employee")
      .then((result) => {
        // Sort the employee data
        const sortedData = result.data.employees.sort((a, b) => {
          const updatedAtComparison =
            new Date(b.updatedAt) - new Date(a.updatedAt);
          if (updatedAtComparison !== 0) {
            return updatedAtComparison;
          } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
        });
        setEmpData(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    navigate("/employeeform", { state: id });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/employee/${id}`)
      .then((res) => {
        console.log(res);
        toast.success("Employee deleted successfully");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="title">
        <h3>The Employee Manager </h3>
      </div>
      <div className="btn-container">
        <button className="cust-btn" onClick={() => navigate("/employeeform")}>
          Add Employee <IoPersonAddSharp className="btn-icon-type1" />
        </button>
      </div>
      <div className="card-container">
        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="row">
            {empData?.length > 0 ? (
              empData?.map((employee) => (
                <div className="card bg-light-subtle" key={employee._id}>
                  <div className="card-body">
                    <div className="text-section">
                      <h5 className="card-title fw-bold">
                        {employee.firstname}
                      </h5>
                      <h5 className="card-title fw-bold">
                        {employee.lastname}
                      </h5>
                      <p className="card-text">Email: {employee.email}</p>
                      <p className="card-text">Phone No: {employee.phone}</p>
                      <p className="card-text">Gender: {employee.gender}</p>
                    </div>
                    <div className="cta-section">
                      <button
                        onClick={() => handleEdit(employee._id)}
                        className="cust-btn edit-btn"
                      >
                        <MdEdit className="btn-icon-type2" />
                      </button>
                      <button
                        className="cust-btn delete-btn "
                        onClick={() => handleDelete(employee._id)}
                      >
                        <MdDelete className="btn-icon-type2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="noempdata text-center">
                <p>No Employees Found</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Employees;
