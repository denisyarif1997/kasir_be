// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sistem_kasir',
  password: 'deni',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
