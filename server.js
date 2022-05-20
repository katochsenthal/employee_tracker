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
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "exit",
        ],
      },
    ])
    .then((userAnswer) => {
      switch (userAnswer.menu) {
        case "view all departments":
          console.log("view departments");
          break;
        case "view all roles":
          console.log("view roles");
          break;
        case "view all employees":
          console.log("view employees");
          break;
        case "add a department":
          console.log("add departments");
          break;
        case "add a role":
          console.log("add role");
          break;
        case "add an employee":
          console.log("add employee");
          break;
        case "update an employee role":
          console.log("update employee role");
          break;
        default:
          process.exit();
      }
    });
};
