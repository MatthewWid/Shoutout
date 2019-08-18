const router = require("express").Router();
const wrap = require("../../helpers/wrapAsync");

const home = require("./home.controllers.js");

// Debug API test response
router.get("/ping",
	home.ping
);
// Get site statistics
router.get("/stats",
	wrap(home.getStats)
);

module.exports = router;
