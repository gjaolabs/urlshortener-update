const { Router } = require("express");
const controller = require("./controller");

const router = Router();
router.post("/api/shorturl", controller.postEntry);
router.get("/api/shorturls/:shorturl", controller.getEntry);
// Does not consider this endpoint as 'headless' api, but a link that would be
// opened in a browser as {domain}/open/123456
router.get("/open/:shorturl", controller.getRedirect);
module.exports = router;
