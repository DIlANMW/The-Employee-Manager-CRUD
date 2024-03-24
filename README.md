**The Employee Manger-CRUD**

### FRONT-END

Features

1. Display a list of employees with their details (First name, Last name, Email address, Phone number, Gender).
2. Add new employees to the system.
3. Edit existing employee information.
4. Delete employees from the system.
5. Form validation for input fields. ( I have used Yup for form validation)
6. Custom styling using Bootstrap with custom CSS for enhanced UI

Installation

1. git clone https://github.com/DIlANMW/The-Employee-Manager-CRUD.git
2. cd client
3. npm install( I have used yarn)
4. npm run dev

Folder Structure

client/
│
├── home/
│ ├── Employees.js
│
├── employee-form/
│ ├── EmployeeForm.js (I have used the same component to update and create employees both)
│
├── App.js
├── index.js
├── App.css
└── README.md

Dependencies

axios: ^1.6.8
bootstrap: ^5.3.3
react: ^18.2.0
react-dom: ^18.2.0
react-hot-toast: ^2.4.1
react-icons: ^5.0.1
react-router-dom: ^6.22.3
yup: ^1.4.0

### BACK-END

# Installation

2. cd server
3. npm install( I have used yarn)
4. npm run dev

## API Endpoints

- **List Employees**: `[GET] /api/employee`
- **Add Employee**: `[POST] /api/employee`
- **Update Employee**: `[PUT] /api/employee/:id`
- **Delete Employee**: `[DELETE] /api/employee/:id`
- **Get One Employee**: `[GET] /api/employee/:id`

The `EmployeeModel` schema defines the structure of employee documents stored in the MongoDB database. It includes the following fields:

- `firstname`: First name of the employee (String, required)
- `lastname`: Last name of the employee (String, required)
- `email`: Email address of the employee (String, required)
- `phone`: Phone number of the employee (String, required)
- `gender`: Gender of the employee (String, enum: ["male", "female"], required)
- `timestamps`: Automatic timestamps for `createdAt` and `updatedAt`

## Dependencies

- cors: ^2.8.5
- dotenv: ^16.4.5
- express: ^4.19.1
- mongoose: ^8.2.3
- nodemon: ^3.1.0
