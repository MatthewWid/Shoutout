const router = require("express").Router();
const apiRoutes = require("./api.js");

const homeController = require("../controllers/homeController.js");

// API
router.use("/api", apiRoutes);
// SPA
router.get("*",
	homeController.indexPage
);

module.exports = router;
