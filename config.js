require("dotenv").config({
  override: true,
  path: "development.env",
});

module.exports = {
  MONGO_DB_URL: process.env.DB_URI || "mongodb://localhost/urls",
  LISTENING_PORT: process.env.PORT || 3000,
};
