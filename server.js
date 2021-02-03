const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_employees"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
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
    ).then(function (answer) {
        switch (answer.action) {
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
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
}

function emplByDept(){
    inquirer.prompt({
            name: "department",
            type: "list",
            message: "Which department would you like to view?",
            choices: [
                "Legal",
                "Finance",
                "Engineering",
                "Sales"
            ]
        }).then(function (answer) {
            let query = "SELECT employee.id AS ID, employee.first_name AS 'First Name', employee.last_name AS 'Last Name', roles.title AS 'Role', department.dpt_name AS 'Department'";
            query += " FROM department"; 
            query += " LEFT JOIN roles ON roles.department_id = department.id"; 
            query += " LEFT JOIN employee ON (roles.id = employee.role_id)";
            query += " WHERE department.dpt_name = ?";
        connection.query(query, answer.department, function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
});
}

function emplByMgr() {}

function addEmployee() {
    inquirer.prompt([
        {
            name: "employee_firstname",
            type: "input",
            message: "What's the employee's first name?"
        },
        {
            name: "employee_lastname",
            type: "input",
            message: "What's the employee's last name?"
        },
        {
            name: "employee_role",
            type: "number",
            message: "What's the employee's role id?"
        },
        {
            name: "employee_manager",
            type: "number",
            message: "Who does the employee report to?"
        },
        {
            name: "employee_titleid",
            type: "input",
            message: "What's the employee's title ID?"
        },
        {
            name: "employee_title",
            type: "input",
            message: "What's the employee's title?"
        },
        {
            name: "employee_salary",
            type: "number",
            message: "What's the employee's annual salary?"
        },
        {
            name: "employee_dptid",
            type: "input",
            message: "What's the employee's department ID?"
        },
        {
            name: "employee_dpt",
            type: "input",
            message: "What department are they in?"
        }
    ]).then(function(answer) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.employee_firstname,
                last_name: answer.employee_lastname,
                role_id: answer.employee_role,
                manager_id: answer.employee_manager
            },
            "INSERT INTO roles SET ?",
            {
                id: answer.employee_titleid,
                title: answer.employee_title,
                salary: answer.employee_salary,
                department_id: answer.employee_dptid
            },
            "INSERT INTO department SET ?",
            {
                id: answer.employee_dptid,
                name: answer.employee_dpt
            },
            //console.log("Success");
            function(err) {
                if (err) throw err;
                console.log(err);
                console.log("Something went wrong adding new hire");
                //re-prompt
                start();
            });
    });
}

function rmEmployee() {}
function updateRole() {}
function updateMgr() {}