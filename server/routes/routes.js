import express from "express";
import {
  createEmployee,
  getEmployee,
} from "../controllers/EmployeeController.js";

const routers = express.Router();

routers.post("/employee", createEmployee);
routers.get("/employee", getEmployee);

export default routers;
