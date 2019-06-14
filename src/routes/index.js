const router = require("express").Router();
const postController = require("../controllers/postController");
const wrap = require("../helpers/wrapAsync");

router.get("/", postController.indexPage);

module.exports = router;
