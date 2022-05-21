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
          viewDepartments();
          console.log("Departments");
          break;

        case "View all roles":
          viewRoles();
          console.log("Roles");
          break;

        case "View all employees":
          viewEmployee();
          console.log("Employees");
          break;

        case "Add a department":
          addDepartment();
          console.log("Add department");
          break;

        case "Add a role":
          console.log("add a role");
          break;

        case "Add a employee":
          console.log("add a employee");
          break;

        case "Update an employee role":
          console.log("update a employee role");
          break;

        default:
          console.log("Default", userAnswer.menu);
          process.exit();
      }
    });
};

const viewDepartments = () => {
  connection.query("SELECT * FROM department;", (err, results) => {
    console.table(results);
  });
};

const viewRoles = () => {
  connection.query("SELECT * FROM role;", (err, results) => {
    console.table(results);
  });
};

const viewEmployee = () => {
  connection.query("SELECT * FROM employee;", (err, results) => {
    console.table(results);
  });
};

const addDepartment = () => {
  connection.query(
    'INSERT INTO department (name) VALUES("Software2");',
    // if condition result.affectedRows === 1;
    // select statement to show department table;
    (err, results) => {
      if ({ affectedRows } === 1) {
        `SELECT * FROM department`;
      }
      console.table(results);
    }
  );
};

promptMenu();
