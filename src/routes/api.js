const router = require("express").Router();
const wrap = require("../helpers/wrapAsync");

const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");
const postController = require("../controllers/postController.js");

router.get("/ping", (req, res) => res.send("pong"));

router.post("/user/register",	userController.createUser);
router.post("/user/login",
	authController.login,
	userController.getLoggedInUser
);

router.post("/post", wrap(postController.createPost));
router.get("/posts", wrap(postController.getAllPosts));

module.exports = router;
