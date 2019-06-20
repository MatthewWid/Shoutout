const router = require("express").Router();
const apiRoutes = require("./api.js");
const authController = require("../controllers/authController.js");
// const userController = require("../controllers/userController.js");
const postController = require("../controllers/postController.js");

// API
router.use("/api", apiRoutes);
// SPA
router.get("*",
	postController.indexPage
);

module.exports = router;
