const router = require("express").Router();
const wrap = require("../helpers/wrapAsync");
const apiRoutes = require("./api.js");
const postController = require("../controllers/postController");

// API
router.use("/api", apiRoutes);
// SPA
router.get("*", postController.indexPage);

module.exports = router;
