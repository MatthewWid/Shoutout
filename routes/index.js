const router = require("express").Router();
const postController = require("../controllers/postController");

router.get("/", postController.homePage);

module.exports = router;
