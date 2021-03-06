const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_employees"
});

connection.connect(function (err) {
    if (err) throw err;
    init();
});

function init(){
    figlet("\nEMPLOYEE\nMANAGER", function(err, data){
        console.log(data);
        runSearch();
    });   
}

function runSearch() {
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
                "View all employees ordered by manager",
                "Add a new item (employee, role, or department)",
                "Remove Employee",
                "Update Employee Role"
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

            case "View all employees ordered by manager":
                emplByMgr();
                break;

            case "Add a new item (employee, role, or department)":
                addSomething();
                break;

            case "Remove Employee":
                rmEmployee();
                break;

            case "Update Employee Role":
                updateRole();
                break;
        }
    });
}

function allEmployees() {
    let query = "SELECT id, first_name AS 'First Name', last_name AS 'Last Name', role_id AS 'Role Id', manager_id AS 'Manager Id' FROM employee";
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

function emplByMgr() {
    let query = "SELECT employee.first_name AS 'First Name', employee.last_name AS 'Last Name', manager_id AS 'ReportingManagerId'";
    query += " FROM employee WHERE manager_id IS NOT NULL";
    query += " ORDER BY employee.manager_id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
}

function addSomething() {
    inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to add?",
            choices: [
                "Add a new employee",
                "Add a new department",
                "Add a new role"
            ]
    }).then(function (answer) {
        switch (answer.action) {
            case "Add a new employee":
                addEmployee();
                break;

            case "Add a new department":
                addDepartment();
                break;
            
            case "Add a new role":
                addRole();
                break;
            }
    });
}

function addEmployee(){
    inquirer.prompt(
        [
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
                message: "Reports to Manager ID#"
            }
        ]
        ).then(function(answer){
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.employee_firstname,
                    last_name: answer.employee_lastname,
                    role_id: answer.employee_role,
                    manager_id: answer.employee_manager
                });
                console.log("\nNew employee has been added to the database\n");
                runSearch();
        });
}

function addRole(){
    inquirer.prompt(
        [
            {
                name: "role_name",
                type: "input",
                message: "What would you like to name this new role?"
            },
            {
                name: "role_id",
                type: "input",
                message: "Which ID would you like to assign to this role?"
            },
            {
                name: "salary",
                type: "number",
                message: " What is the base salary of this role?"
            },
            {
                name: "department_id",
                type: "number",
                message: "Which department ID should be assigned?"
            }
        ]
    ).then(function(answer){
        connection.query(
            "INSERT INTO roles SET ?",
            {
                id: answer.role_id,
                title: answer.role_name,
                salary: answer.salary,
                department_id: answer.department_id
            }
        );
        console.log("\nNew role has been added to the database\n");
        runSearch();
    });
}

function addDepartment(){
    inquirer.prompt([
        {
            name: "dpt_name",
            type: "input",
            message: "\nWhat is the name of the new department?\n"
        },
        {
            name: "dpt_id",
            type: "number",
            message: "What is the ID number of the new department?"
        }
    ]).then(function(answer){
        connection.query(
            "INSERT INTO department SET ?",
            {
                id: answer.dpt_id,
                dpt_name: answer.dpt_name
            }
        );
        console.log("\nNew department has been added to the database\n");
        runSearch();
    });
}

function rmEmployee() {

        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the first name of employee?"
            },
            {
                name: "last_name",
                type : "input",
                message: "What is the last name of employee?"
            }
        ]).then(function(answer){
            connection.query(
                "DELETE FROM employee WHERE ? AND ?",
                [{
                    first_name: answer.first_name
                },
                {
                    last_name: answer.last_name
                }]
            );
        console.log("\nCheck the database to confirm deletion\n");
        runSearch();
    });
}

function updateRole() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: "First name of employee you are updating today?"
        },
        {
            name: 'last_name',
            type: 'input',
            message: "Last name of employee you are updating today?"
        },
        {
            name: "role_id",
            type: 'number',
            message: 'What is their new role id?'
        }
    ]).then(function(answer){
        connection.query (
            "UPDATE employee SET ? WHERE ? AND ?",
            [{
                role_id: answer.role_id            
            },
            {
                first_name: answer.first_name
            },
            {
                last_name: answer.last_name
            }]
        );
        console.log("\nEmployee role has been updated\n");
        runSearch();
    });
}