DROP DATABASE IF EXISTS company_employees;
CREATE DATABASE company_employees;
USE company_employees;

-- create 3 different tables --
CREATE TABLE department(
    id INTEGER (4) NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INTEGER (4) NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (7,2) NOT NULL,
    department_id INTEGER (4) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER (4) NOT NULL,
    manager_id INTEGER (6),
    PRIMARY KEY (id)
);


-- Creates new rows containing data in all named columns --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1353, 72);

INSERT INTO roles (id, title, salary, department_id)
VALUES (1353, "Software Engineer", 700000.00, 3);

INSERT INTO department (id, name)
VALUES (3, "Engineering");

SELECT * FROM employee;