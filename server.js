const inquirer = require("inquirer");
const fs = require("fs");
const express = require("express");
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employee_db",
  password: "katoch13",
});

// user menu prompt
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
          break;

        case "View all roles":
          viewRoles();
          break;

        case "View all employees":
          viewEmployee();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add a employee":
          addEmployee();
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
    promptMenu();
  });
};

const viewRoles = () => {
  connection.query("SELECT * FROM role;", (err, results) => {
    console.table(results);
    promptMenu();
  });
};

const viewEmployee = () => {
  connection.query("SELECT * FROM employee;", (err, results) => {
    console.table(results);
    promptMenu();
  });
};

// user adding a department to the department table
const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department you would like to add?",
        validate: (departmentName) => {
          if (departmentName) {
            return true;
          } else {
            console.log("Please enter the name of your department");
            return false;
          }
        },
      },
    ])
    .then(({ department }) => {
      console.log(department);
      const sql = `INSERT INTO department(name) VALUES(?)`;
      connection.query(sql, department, (err, results) => {
        if (err) throw err;
        console.log(`${department} had been added to the database`);
      });
      viewDepartments();
    });
};

// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// linking role table to department table
const addRole = () => {
  return connection
    .promise()
    .query("SELECT department.id, department.name FROM department;")
    .then(([department]) => {
      let departmentChoices = department.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      inquirer
        .prompt([
          {
            type: "input",
            name: "roleTitle",
            message: "Enter the name of your role title",
            validate: (roleTitle) => {
              if (roleTitle) {
                return true;
              } else {
                console.log("Enter a role title");
                return false;
              }
            },
          },
          {
            type: "number",
            name: "roleSalary",
            message: "What is the roles salary?",
          },
          {
            type: "list",
            name: "department",
            message: "Select this role's department?",
            choices: departmentChoices,
          },
        ])
        .then(({ roleTitle, roleSalary, department_id }) => {
          const sql = `INSERT INTO role SET ?`;
          const roleData = {
            title: roleTitle,
            salary: roleSalary,
            department_id: department.id,
          };
          const query = connection.query(sql, roleData, (err, results) => {
            if (err) throw err;
            console.log(`${roleData} has been added to the database`);
          });
          viewRoles();
        });
    });
};

promptMenu();
