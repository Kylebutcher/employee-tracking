const inquirer = require('inquirer');
const { Pool } = require('pg');
require('dotenv').config();

// Connects to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: process.env.DB_USER,
    // TODO: Enter PostgreSQL password
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME
  },
  console.log(`Connected to the employee_DB database.`)
)

// const getConnection = function (callback) {
//   pool.getConnection(function (err, connection) {
//     callback(err, connection);
//   });
// };


// const result = pool.query('SELECT * FROM role')
//   (result.rows.map)


function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "Options",
        choices: ['Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit', 'View All Employees'],
      }
    ]).then((response) => {
      const { Options } = response;
      switch (Options) {
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View all Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addEmployeeRole();
          break;
        case 'View All Departments':
          viewDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Quit':
          pool.end();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
      }
    })
}
function viewAllEmployees() {
  let employee = pool.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ',manager.last_name)AS manager
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id= department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`, (err, results) => {
    if (err) throw err;
    console.table(results.rows)
    mainMenu();
  })
};

function viewDepartments() {
  let department = pool.query(`SELECT * FROM department`,
    (err, results) => {
      if (err) throw err;
      console.table(results.rows)
      mainMenu();
    })
};

function viewAllRoles() {
  let roles = pool.query(`SELECT role.id, role.title, department.name, role.salary 
    FROM role
    LEFT JOIN department ON department.id = role.department_id`, (err, results) => {
    if (err) throw err;
    console.table(results.rows)
    mainMenu();
  })
};

function updateEmployeeRole() {
  let employeeTable = pool.query(`SELECT * FROM employee`, (err, results) => {
    if (err) throw err;
    let employee = results.rows.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }))

    let roleTable = pool.query(`SELECT * FROM role`, (err, results) => {
      if (err) throw err;
      let role = results.rows.map(({ id, title, }) =>
        ({ value: id, name: title })
      )
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee do you want to select?",
            name: "Options",
            choices: employee
          },
          {
            type: "list",
            message: "What role do you want to put the employee into?",
            name: "Update",
            choices: role
          }
        ])
    }
    )

  })
}



mainMenu();

//   {
//     type: "list",
//     message: "What is the name of the department?",
//     name: "Department",
//     choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
//   },
//   {
//     type: "input",
//     message: "What is the name of the role?",
//     name: "Role",
//   },
//   {
//     type: "input",
//     message: "What is the salary of the role?",
//     name: "Salary",
//   },
//   {
//     type: "list",
//     message: "Which department does the role belong to?",
//     choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
//     name: "Department Role",
//   },

// ])

//     //new still working
// {
//   type: "list",
//   message: "What is the name of the department?",
//   name: "Department",
//   choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
// },
// {
//   type: "input",
//   message: "What is the name of the role?",
//   name: "Role",
// },
// {
//   type: "input",
//   message: "What is the salary of the role?",
//   name: "Salary",
// },
// {
//   type: "list",
//   message: "Which department does the role belong to?",
//   choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
//   name: "Department Role",
// },


// module.exports = getConnection;