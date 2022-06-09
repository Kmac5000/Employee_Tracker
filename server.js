require("dotenv").config();

const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");

const connection = mysql.createConnection(
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3001,
  }
);

function startProgram() {
  inquirer.prompt([
    {
      type: "list",
      message: "What do you need to see?",
      name: "choice",
      choices: [
        "View All Employees?",
        "View All Employee's By Roles?",
        "View all Emplyees By Deparments",
        "Update Employee",
        "Add Employee?",
        "Add Role?",
        "Add Department?",
      ],
    },
  ]);
}

startProgram();
