import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getOneEmployee,
  updateEmployee,
} from "../controllers/EmployeeController.js";

const routers = express.Router();

routers.post("/employee", createEmployee);
routers.get("/employee", getEmployee);
routers.get("/employee/:id", getOneEmployee);
routers.put("/employee/:id", updateEmployee);
routers.delete("/employee/:id", deleteEmployee);

export default routers;
