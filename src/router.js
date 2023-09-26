const { Router } = require("express");
const makeController = require("./controller");
const { validateURL } = require("./url_validation");

function makeRoutes(db) {
  const router = Router();
  const controller = makeController(db);
  router.post("/api/shorturl", validateURL, controller.postEntry);
  router.get("/api/shorturls/:shorturl", controller.getEntry);
  // Does not consider this endpoint as 'headless' api, but a link that would be
  // opened in a browser as {domain}/open/123456
  router.get("/open/:shorturl", controller.getRedirect);

  return router;
}

module.exports = makeRoutes;
