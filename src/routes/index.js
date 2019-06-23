const router = require("express").Router();
const apiRoutes = require("./api.js");

const postController = require("../controllers/postController.js");

// API
router.use("/api", apiRoutes);
// SPA
router.get("*",
	postController.indexPage
);

module.exports = router;
