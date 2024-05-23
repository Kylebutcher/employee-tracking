
-- Drops the table
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Uses the employee database
\c employee_db;

-- creates tables

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
)
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL
)
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER
)


SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, manager.last_name
FROM employee 
JOIN role ON employee.role_id = role.id
JOIN department ON department.id = role.department_id
JOIN employee AS manager ON employee.manager_id = manager.id