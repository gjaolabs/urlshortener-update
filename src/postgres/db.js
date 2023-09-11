const { Pool } = require("pg");
require("dotenv").config({
  override: true,
  path: "././development.env",
});

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const { Client } = require('pg');

//IMPORTANT: tried to connect to dedicated url_shortener db via .env file - keeps connecting to default postgres db

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

console.log(process.env.USER, process.env.HOST, process.env.DATABASE, process.env.PASSWORD, process.env.PORT);


client.connect();
client.query(`
  CREATE TABLE IF NOT EXISTS url_shortener (
    id SERIAL PRIMARY KEY,
    longurl TEXT NOT NULL,
    shorturl TEXT NOT NULL,
    issueddate TIMESTAMP NOT NULL DEFAULT NOW()
)`, (err, res) => {
  console.log(err ? err.stack : 'Table created successfully');
  client.end();
});



module.exports = pool;
