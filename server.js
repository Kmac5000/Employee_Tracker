require("dotenv").config();

const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(function (err) {
  if (err) throw err;

  startProgram();
});

function startProgram() {
  inquirer
    .prompt([
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
      },
    ])
    .then(({ choice }) => {
      console.log("these are the" + choice);

      if (choice === "View All Departments") {
        viewAllDepartments();
      }

      if (choice === "View All Roles") {
        viewAllRoles();
      }

      if (choice === "View all Employees") {
        viewAllEmployees();
      }

      if (choice === "Add Department") {
        addDepartment();
      }

      if (choice === "Add Employee") {
        addEmployee();
      }

      if (choice === "Update Employee Role") {
        updateEmployeeRole();
      }
    });
}

function viewAllDepartments() {
  console.log("all departments");
  // department names, department ids
  let departments = "SELECT department.name, department.id FROM department";
  connection.query(departments, function (err, res) {
    if (err) throw err;
    console.table(res);
    startProgram();
  });
}

function viewAllRoles() {
  // job titles, role id, department that role is in, salary for that role
  let roles =
    "SELECT role.title, role.id, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id";

  connection.query(roles, function (err, res) {
    if (err) throw err;
    console.table(res);
    startProgram();
  });
}

function viewAllEmployees() {
  //  employee ids, first names, last names, job titles, salaries, employee's manager
  let allEmp =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, CONCAT (manager.first_name, SPACE(1), manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON employee.manager_id = manager.id";
  connection.query(allEmp, function (err, res) {
    if (err) throw err;
    console.table(res);
    startProgram();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Name of New Department",
        name: "new_department",
      },
    ])
    .then((newDep) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      connection.query(sql, newDep.new_department, (err, res) => {
        if (err) throw err;
        console.log("Added " + newDep.new_department + " to departments");

        startProgram();
      });
    });
}

// first_name, last_name, role, manager
function addEmployee() {
  const roleSql = `SELECT role.id, role.title FROM role`;

  connection.query(roleSql, (err, data) => {
    if (err) throw err;

    const roles = data.map(({ id, title }) => ({ name: title, value: id }));

    const managerSql = `SELECT * FROM employee`;

    connection.query(managerSql, (err, data) => {
      if (err) throw err;

      const managers = data.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id,
      }));
      inquirer
        .prompt([
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
            name: "role",
            message: "What is the employee's role?",
            choices: roles,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: managers,
          },
        ])
        .then(({ newEmp }) => {
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (first_name, last_name, role_id, manager_id )`;
          connection.query(sql, newEmp, (err, res) => {
            if (err) throw err;
            console.log("Added to employees");

            startProgram();
          });
        });
    });
  });
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
