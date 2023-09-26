const { body, validationResult } = require("express-validator");

// Define an array of middleware functions to validate the URL
const validateURL = [
  body("url").isURL(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateURL };
