const { Pool } = require("pg");
require("dotenv").config({
  override: true,
  path: "././development.env",
});

const createURLTable = require("./create_table");

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

console.log(
  process.env.USER,
  process.env.HOST,
  process.env.DATABASE,
  process.env.PASSWORD,
  process.env.PORT
);

createURLTable();

module.exports = pool;
