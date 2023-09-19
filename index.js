require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config");
const makeRouter = require("./src/router");
const mongoConnect = require("./src/mongo/connector");
const scheduler = require("./src/scheduler");

// Express Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(`${process.cwd()}/public`));

// Serve index page
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//Run scheduler
scheduler();

// setup database
let dbImpl;

if (config?.DB_TYPE === "mongo") {
  mongoConnect.connect();
  console.log("Using MongoDB");
  console.log(mongoConnect.connState());
  const db = require("./src/mongo/models");
  const MongoLinkRepository = require("./src/mongo/mongo_link_repository");
  dbImpl = new MongoLinkRepository(db);
} else {
  const db = require("./src/postgres/db");
  const PgLinkRepository = require("./src/postgres/pg_link_repository");
  dbImpl = new PgLinkRepository(db);
  console.log("Using PostgreSQL");
}

//Use src/router.js
app.use("/", makeRouter(dbImpl));

app.listen(config.LISTENING_PORT, "0.0.0.0", function () {
  console.log(`Listening on port ${config.LISTENING_PORT}`);
});
