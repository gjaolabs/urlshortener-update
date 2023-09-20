const mongoose = require("mongoose");
require("dotenv").config({
  override: true,
  path: "././development.env",
});

function connect() {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => console.log("DB CONNECTION SUCCESFUL"))
    .catch((err) => console.error(err));
}

function connState() {
  return mongoose.connection.readyState;
}

module.exports = {
  connect,
  connState,
};
