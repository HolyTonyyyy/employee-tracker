
const inquirer = require("inquirer")
const mysql = require('mysql2')

const db = mysql.createConnection({
    password: "Muskegon4!",
    database: "workers_db",
    host: "localhost",
    port: 3306,
    user: "root"
});

db.connect((err) => {
    if(err)throw err
})

// Prompt Choices
function start () {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "toDo",
            choices: [
                "View all Employees",
                "View all Roles",
                "View all Departments",
            ]
        }
    ])
    .then(answers=>{
        if (answers.toDo == "View all Employees"){
            viewAllEmployees()
        } else if (answers.toDo == "View all Roles"){
            viewAllRoles()
        } 
    })
}

function viewAllEmployees(){
    db.query(`select * from employee`, (err, res) => {
        if (err) console.log(err)
        console.table(res)
        start()
    })
}

function viewAllRoles(){
    db.query(`select * from roles`, (err, res) => {
        if (err) console.log(err)
        console.table(res)
        start()
    })
}

start()