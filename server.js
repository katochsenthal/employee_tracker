const inquirer = require("inquirer");
const fs = require("fs");
const express = require("express");
const mysql = require("mysql2");

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employee_db",
  password: "katoch13",
});

const promptMenu = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((userAnswer) => {
      switch (userAnswer.menu) {
        case "View all departments":
          console.log("Departments");
          break;

        case "View all roles":
          console.log("Roles");
          break;

        case "View all employees":
          console.log("Employees");
          break;

        case "add a department":
          console.log("Add a department");
          break;

        case "add a role":
          console.log("add a role");
          break;

        case "add a employee":
          console.log("add a employee");
          break;

        case "update an employee role":
          console.log("update a employee role");
          break;

        default:
          process.exit();
      }
    });
};

const selectDepartments = () => {
  connection.query("SELECT * FROM department;", (err, results) => {});
};

promptMenu();
