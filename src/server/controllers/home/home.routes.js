const router = require("express").Router();
const home = require("./home.controllers.js");

// Debug API test response
router.get("/ping", home.ping);
// Get site statistics
router.get("/stats", home.getStats);

module.exports = router;
