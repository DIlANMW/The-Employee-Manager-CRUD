import EmployeeModel from "../models/EmployeeModel.js";

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

export { createEmployee };
