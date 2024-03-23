import express from "express";
import { createEmployee } from "../controllers/EmployeeController.js";

const routers = express.Router();

routers.post("/employee", createEmployee);

export default routers;
