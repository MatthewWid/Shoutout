const wrap = require("../helpers/wrapAsync");
const router = require("express").Router();
const postController = require("../controllers/postController");

router.get("/", wrap(postController.homePage));

module.exports = router;
