const { Router } = require("express");
const controller = require("./controller");

const router = Router();
router.post("/api/shorturl", controller.postEntry);
router.get("/api/get-url/:shorturl", controller.getEntry);
router.get("/api/redirect/:shorturl", controller.getRedirect);
module.exports = router;
