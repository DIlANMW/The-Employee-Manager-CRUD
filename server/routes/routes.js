import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
} from "../controllers/EmployeeController.js";

const routers = express.Router();

routers.post("/employee", createEmployee);
routers.get("/employee", getEmployee);
routers.put("/employee/:id", updateEmployee);
routers.delete("/employee/:id", deleteEmployee);

export default routers;
