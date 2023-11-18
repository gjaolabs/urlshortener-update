const { Router } = require("express");
const makeController = require("./controller");
const { validateURL } = require("./url_validation");
const { login, verifyToken, verifyLogin } = require("./authentication/auth");

function makeRoutes(db) {
  const router = Router();
  const controller = makeController(db);
  router.post("/api/shorturl", verifyToken, validateURL, controller.postEntry);
  router.get("/api/shorturls/:shorturl", controller.getEntry);
  // Does not consider this endpoint as 'headless' api, but a link that would be
  // opened in a browser as {domain}/open/123456
  router.get("/open/:shorturl", controller.getRedirect);
  //Auth route
  router.post("/login", login);
  router.head("/login/verify", verifyLogin);

  return router;
}

module.exports = makeRoutes;
