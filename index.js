const inquirer = require('inquirer');
const {Pool} = require('pg');
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

const getConnection = function(callback) {
  pool.getConnection(function(err, connection) {
    callback(err, connection);
  });
};


const result = pool.query('SELECT * FROM role')
  (result.rows.map)


function mainMenu() {
inquirer 
  .prompt([
    {
      type: "list",
      message: "What would you like to do?" ,
      name: "Options",
      choices: ['Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit', 'View All Employees'],
    }
  ]) .then(response) => {
      switch(mainMenu) {
        case 'Upade Employee Role':
          updateEmployeeRole();
          break;
      }
  }
},
  }
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