import express from "express";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../controllers/EmployeeController.js";

const routers = express.Router();

routers.post("/employee", createEmployee);
routers.get("/employee", getEmployee);
routers.put("/employee/:id", updateEmployee);

export default routers;
