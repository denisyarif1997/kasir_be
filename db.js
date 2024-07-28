// db.js
const { Pool } = require('pg');
require('dotenv').config();

// Access environment variables using process.env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME, // Use the correct variable name for your database
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = pool;
