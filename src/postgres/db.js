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

console.log(
  process.env.USER,
  process.env.HOST,
  process.env.DATABASE,
  process.env.PASSWORD,
  process.env.PORT
);

const urlPool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const { Client } = require("pg");

//IMPORTANT: tried to connect to dedicated url_shortener db via .env file - keeps connecting to default postgres db

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: "url_shortener",
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

client.connect();
client.query(
  `

  CREATE TABLE IF NOT EXISTS public.url_shortener
  (
      id integer NOT NULL DEFAULT nextval('url_shortener_id_seq'::regclass),
      longurl character varying(255) COLLATE pg_catalog."default",
      shorturl character varying(255) COLLATE pg_catalog."default",
      issueddate timestamp with time zone,
      CONSTRAINT url_shortener_pkey PRIMARY KEY (id)
  )

  TABLESPACE pg_default;

  ALTER TABLE IF EXISTS public.url_shortener
      OWNER to postgres;
`,
  (err, res) => {
    console.log(err ? err.stack : "Table created successfully");
    client.end();
  }
);

module.exports = urlPool;
