const router = require("express").Router();
const wrap = require("../helpers/wrapAsync");
const postController = require("../controllers/postController");

router.get("/ping", (req, res) => {
	res.send("pong");
});

router.post("/post", wrap(postController.createPost));
router.get("/posts", wrap(postController.getAllPosts));

module.exports = router;
