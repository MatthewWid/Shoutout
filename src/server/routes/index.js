const router = require("express").Router();
const apiRoutes = require("./api.js");

const {home} = require("../controllers/");

// API
router.use("/api", apiRoutes);
// SPA
router.get("*",
	home.indexPage
);

module.exports = router;
