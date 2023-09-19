const { Client } = require("pg");
require("dotenv").config({
  override: true,
  path: "././development.env",
});

/* These are multiple queries into 1 query functional call. It might be not accepted.

Also, the alter owner and tablespace queries are not suited for a migration script. They need to be configured beforehand with the setup of the database. That's why you need to make sure to have a dedicated dev user per db (ex. url-shortener-db-user) for the db, that has enough rights and permissions to create, alter, write, and read to the tables of the specific db.

import { Client } from 'pg'
const client = new Client({..})

await client.connect()

const createResult = await client.query('CREATE TABLE')
console.log(result)

await client.end()

*/

async function createURLTable() {
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });

  try {
    await client.connect();

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS url_shortener (
        id SERIAL PRIMARY KEY,
        longurl VARCHAR(255) NOT NULL,
        shorturl VARCHAR(255) NOT NULL,
        issueddate TIMESTAMP WITH TIME ZONE NOT NULL
      )
    `;
    await client.query(createTableQuery);
    console.log(
      'Table "url_shortener" created successfully (if it didn\'t already exist)'
    );
  } catch (error) {
    console.log("Error creating table: ", error);
  } finally {
    client.end();
  }
}
module.exports = createURLTable;
