const mongoose = require("mongoose");

const URLSchema = mongoose.Schema(
  {
    longURL: String,
    shortURL: String,
    issuedDate: Date,
  },
  { versionKey: false }
);

const URL = mongoose.model("URL", URLSchema);

module.exports = {
  URL: URL,
};
