const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_employees"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

function runSearch(){
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
                "View all employees by manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager"
            ]
        }
    ).then(function(answer) {
        switch (answer.action){
            case "View all employees":
                allEmployees();
                break;

            case "View all employees by department":
                emplByDept();
                break;

            case "View all employees by manager":
                emplByMgr();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Remove Employee":
                rmEmployee();
                break;

            case "Update Employee Role":
                updateRole();
                break;

            case "Update Employee Manager":
                updateMgr();
                break;
        }
    });
}

function allEmployees() {
    let query = "SELECT * FROM employee";
}
function emplByDept() {}
function emplByMgr() {}
function addEmployee() {}
function rmEmployee() {}
function updateRole() {}
function updateMgr() {}