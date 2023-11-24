require("dotenv").config({
  override: true,
  path: "development.env",
});

module.exports = {
  LISTENING_PORT: process.env.LISTENING_PORT || 3000,
  DB_TYPE: process.env.DB_TYPE || "mongo", //mongo or postgres
};
