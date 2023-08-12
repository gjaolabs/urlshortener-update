require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { LISTENING_PORT } = require("./config");
const makeRouter = require("./src/router");

// Express Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(`${process.cwd()}/public`));

// Serve index page
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// setup database
const db = require("./src/postgres/db");
const PgLinkRepository = require("./src/postgres/pg_link_repository");
let dbImpl = new PgLinkRepository(db);

//Use src/router.js
app.use("/", makeRouter(dbImpl));

app.listen(LISTENING_PORT, "0.0.0.0", function () {
  console.log(`Listening on port ${LISTENING_PORT}`);
});
