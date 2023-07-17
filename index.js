require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { LISTENING_PORT } = require("./config");
const router = require("./src/router");

// Express Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(`${process.cwd()}/public`));

// Serve index page
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//Use src/router.js
app.use("/", router);

app.listen(LISTENING_PORT, "0.0.0.0", function () {
  console.log(`Listening on port ${LISTENING_PORT}`);
});
