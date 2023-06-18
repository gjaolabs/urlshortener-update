const mongoose = require("mongoose");
const { MONGO_DB_URL } = require('./config')

function connect() {
  mongoose
    .connect(MONGO_DB_URL)
    .then(console.log("DB CONNECTION SUCCESFUL"))
    .catch((err) => console.error(err));
}

function connState() {
  return mongoose.connection.readyState;
}

module.exports = {
  connect,
  connState
}
