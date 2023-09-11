const { Client } = require('pg');
require("dotenv").config({
    override: true,
    path: "././development.env",
  });

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

client.connect();

client.query(`
  CREATE TABLE [IF NOT EXISTS] url_shortener (
    id SERIAL PRIMARY KEY,
    long_url TEXT NOT NULL,
    short_url TEXT NOT NULL,
    issued_date TIMESTAMP NOT NULL DEFAULT NOW());`, (err, res) => {
  console.log(err ? err.stack : 'Table created successfully');
  client.end();
});