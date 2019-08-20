const router = require("express").Router();
const validate = require("../../middlewares/validate.js");
const wrap = require("../../helpers/wrapAsync");

const post = require("./post.controllers.js");
const auth = require("../auth/auth.controllers.js");

// Create a new post
router.post("/post",
	validate(post.createPost),
	auth.ensureLoggedIn,
	wrap(post.createPost)
);
// Get a single post
router.get("/post",
	validate(post.getPost),
	wrap(post.getPost)
);
// Update a single post
router.put("/post/:postId",
	validate(post.editPost),
	auth.ensureLoggedIn,
	wrap(post.ensurePostAuthor),
	wrap(post.editPost)
);
// Delete a post
router.delete("/post/:postId",
	validate(post.deletePost),
	auth.ensureLoggedIn,
	wrap(post.ensurePostAuthor),
	wrap(post.deletePost)
);
// Get many posts with optional filtering, sorting and pagination
router.get("/posts",
	validate(post.getManyPosts),
	wrap(post.getManyPosts)
);
// Get top posts by total likes
router.get("/posts/top",
	validate(post.getTopPosts),
	wrap(post.getTopPosts)
);
// Get personalised post feed
router.get("/posts/curated",
	auth.ensureLoggedIn,
	wrap(post.getCuratedFeed)
);
// Get personalised post feed
router.get("/posts/liked",
	wrap(post.getLikedPosts)
);
// Add a like to a single post
router.post("/post/:postId/like",
	validate(post.addLike),
	auth.ensureLoggedIn,
	wrap(post.addLike)
);
// Remove a like from a single post
router.delete("/post/:postId/like",
	validate(post.removeLike),
	auth.ensureLoggedIn,
	wrap(post.removeLike)
);

module.exports = router;
