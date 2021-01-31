DROP DATABASE IF EXISTS company_employees;
CREATE database company_employees;

USE company_employees;

CREATE TABLE department(
    id INT (4) NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT (4) NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary INT (7) NOT NULL,
    department_id INT (4) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT (4) NOT NULL,
    manager_id INT (6),
    PRIMARY KEY (id)
);                   