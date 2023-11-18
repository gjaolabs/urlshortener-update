const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const usersPath = path.join(__dirname, "/users.json");

const secretKey = "secret-key";
const users = JSON.parse(fs.readFileSync(usersPath));

//Handler for the {domain}/login route. Currently implemented with hardcoded user credentials (users.json) and observed via Postman
const login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  //Create token
  if (password === user.password) {
    const token = jwt.sign(
      { sub: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );

    //Include token in HTTP headers
    res.set("Authorization", token);
    const { exp } = jwt.decode(token);
    res.json({ token: token, message: "Token created successfully", exp: exp });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const verifyToken = async (req, res, next) => {
  console.log(req.header);
  const token = req.header["Authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

const verifyLogin = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    res.sendStatus(200);
  });
};

module.exports = { login, verifyToken, verifyLogin };
