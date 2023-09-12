const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  password: "Muskegon4!",
  database: "workers_db",
  host: "localhost",
  port: 3306,
  user: "root",
});

db.connect((err) => {
  if (err) throw err;
});

// Prompt Choices
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "toDo",
        choices: [
          "View all Employees",
          "View all Roles",
          "View all Departments",
          "add a department",
          "add a role",
          "add an employee",
          "update employee role",
        ],
      },
    ])
    .then((answers) => {
      if (answers.toDo == "View all Employees") {
        viewAllEmployees();
      } else if (answers.toDo == "View all Roles") {
        viewAllRoles();
      } else if (answers.toDo == "View all Departments") {
        viewAllDepartments();
      } else if (answers.toDo == "add a department") {
        addDepartment();
      } else if (answers.toDo == "add a role") {
        addRole();
      } else if (answers.toDo == "add an employee") {
        addEmployee();
      } else if (answers.toDo == "update employee role") {
        updateRole();
      }
    });
}

function viewAllEmployees() {
  db.query(`select * from employee`, (err, res) => {
    if (err) console.log(err);
    console.table(res);
    start();
  });
}

function viewAllRoles() {
  db.query(`select * from role`, (err, res) => {
    if (err) console.log(err);
    console.table(res);
    start();
  });
}
function viewAllDepartments() {
  db.query(`select * from department`, (err, res) => {
    if (err) console.log(err);
    console.table(res);
    start();
  });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "first name?",
        name: "firstname",
      },
      {
        type: "input",
        message: "last name?",
        name: "lastname",
      },
      {
        type: "input",
        message: "role id?",
        name: "roleid",
      },
    ])
    .then((answers) => {
      db.query(
        `insert into employee(first_name, last_name, role_id) values('${answers.firstname}', '${answers.lastname}', ${answers.roleid})`,
        (err, res) => {
          if (err) console.log(err);
          console.table(res);
          start();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "title?",
        name: "title",
      },
      {
        type: "input",
        message: "salary?",
        name: "salary",
      },
      {
        type: "input",
        message: "department id?",
        name: "departmentid",
      },
    ])
    .then((answers) => {
      db.query(
        `insert into role(title, salary, department_id) values('${answers.title}', '${answers.salary}', ${answers.departmentid})`,
        (err, res) => {
          if (err) console.log(err);
          console.table(res);
          start();
        }
      );
    });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "department name?",
        name: "department",
      },
    ])
    .then((answers) => {
      db.query(
        `insert into department(name) values ('${answers.department}')`,
        (err, res) => {
          if (err) console.log(err);
          console.table(res);
          start();
        }
      );
    });
}

start();
