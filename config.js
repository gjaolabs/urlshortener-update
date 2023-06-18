module.exports = {
  MONGO_DB_URL: process.env.DB_URI || "mongodb://localhost",
  LISTENING_PORT: process.env.PORT || 3000
}
