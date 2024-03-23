import { request, response } from "express";
import EmployeeModel from "../models/EmployeeModel.js";

//Create Employee
const createEmployee = async (request, response) => {
  try {
    const { firstname, lastname, email, phone, gender } = request.body;

    const newEmployee = new EmployeeModel({
      firstname,
      lastname,
      email,
      phone,
      gender,
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

export { createEmployee, getEmployee, updateEmployee };
