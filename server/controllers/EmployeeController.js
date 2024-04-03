import { request, response } from "express";
import EmployeeModel from "../models/EmployeeModel.js";

//Create Employee
const createEmployee = async (request, response) => {
  try {
    const { firstname, lastname, email, phone, gender, salary } = request.body;

    const newEmployee = new EmployeeModel({
      firstname,
      lastname,
      email,
      phone,
      gender,
      salary,
    });

    await newEmployee.save();

    response.status(200).json({
      success: true,
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Get all employees
const getEmployee = async (request, response) => {
  try {
    const employees = await EmployeeModel.find();

    if (!employees) {
      return response.status(404).json({
        success: false,
        message: "No employees found",
      });
    }

    response.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Update a employee
const updateEmployee = async (request, response) => {
  try {
    const employeeId = request.params.id;
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      employeeId,
      request.body,
      { new: true }
    );

    if (!updatedEmployee) {
      return response.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    response.status(200).json({
      success: true,
      message: "Employee updated successfully!",
      updatedEmployee: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Delete employee
const deleteEmployee = async (request, response) => {
  try {
    const employeeId = request.params.id;
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return response.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    response.status(200).json({
      success: true,
      message: "Employee deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Get one employee
const getOneEmployee = async (request, response) => {
  try {
    const employeeId = request.params.id;
    const employee = await EmployeeModel.findById(employeeId);

    if (!employee) {
      return response.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    response.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export {
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee,
};
