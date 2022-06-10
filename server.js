// require("dotenv").config();

const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");

// const connection = mysql.createConnection(
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   process.env.DB_NAME,
//   {
//     host: "localhost",EXIT
//     dialect: "mysql",
//     port: 3001,
//   }
// );

// connection.connect(function (err) {
//   if (err) throw err;
//   startProgram();
// });

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;

  startProgram();
});

function startProgram() {
  inquirer.prompt([
    {
      type: "list",
      message: "Please choose one",
      name: "choice",
      choices: [
        "View All Departments",
        "View All Roles",
        "View all Employees",
        "Add Department",
        "Add Employee",
        "Update Employee Role",
      ],
      // when: (choice) => viewAllDepartments(),
    },
  ]);
}

function viewAllDepartments() {
  // department names, department ids
  let departments = "SELECT * FROM department";
  connection.query(departments, function (err, res) {
    if (err) throw err;
    console.table("All Departments:", res);
    startProgram();
  });
}

function viewAllRoles() {
  // job titles, role id, department that role is in, salary for that role
}

function viewAllEmployees() {
  //  employee ids, first names, last names, job titles, salaries, employee's manager
}

function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "Name of New Department",
      name: "new_department",
    },
  ]);
  // .then update database/department table
}

// first_name, last_name, role, manager
function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "Employee First Name",
      name: "first_name",
    },
    {
      type: "input",
      message: "Employee Last Name",
      name: "last_name",
    },
    {
      type: "list",
      message: "role",
      name: "emp_role",
      // choices: pull from role table
    },
    {
      type: "list",
      message: "Employee Manager",
      name: "emp_manager",
      // choices: pull from list of managers
    },
  ]);
  // .then push to database
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: "list",
      message: "who is the employee",
      name: "employee_new_role",
      // pull name from employee table
    },
    {
      type: "list",
      message: "new role",
      name: "new_role",
      // pull from role table
    },
  ]);
  // .then update in database
}
