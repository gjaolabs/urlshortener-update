require("dotenv").config();
const { connect: mongoConnect, connState } = require('./mongo-connector')
const express = require("express");
const cors = require("cors");
const app = express();
const { LISTENING_PORT } = require('./config')
const apiRoutes = require('./src/api-routes')

mongoConnect()

// Express Configuration
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(`${process.cwd()}/public`));

// Get DB health
app.get("/db-health", (req, res) => {
  res.json({ status: connState() });
});

// Serve index page
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

apiRoutes(app)

app.listen(LISTENING_PORT, "0.0.0.0", function () {
  console.log(`Listening on port ${LISTENING_PORT}`);
});
