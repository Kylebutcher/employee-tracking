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
  console.log(`Connected to the movies_db database.`)
)