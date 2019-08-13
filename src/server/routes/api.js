const router = require("express").Router();
const wrap = require("../helpers/wrapAsync");

const {home, auth, user, post} = require("../controllers/");
const validate = require("../middlewares/validate.js");

// Debug API test response
router.get("/ping",
	home.ping
);

// Authenticate and return the user from a given session if the session is valid
router.get("/user/auth",
	user.getLoggedInUser
);
// Get a single user
router.get("/user",
	validate(user.getUser),
	wrap(user.getUser)
);
// Register a new user with a name, email and password
router.post("/user",
	validate(user.createUser),
	wrap(user.createUser),
	auth.login,
	user.getLoggedInUser
);
// Update a single users' settings
router.put("/user/:userId",
	validate(user.editUser),
	auth.ensureLoggedIn,
	user.ensureOwnUser,
	wrap(user.editUser)
);
// Log in as a user with a name and password
router.post("/user/login",
	validate(auth.login),
	auth.login,
	user.getLoggedInUser
);
// Log out of a user session
router.post("/user/logout",
	auth.logout
);
// Follow a single user
router.post("/user/:userId/follow",
	validate(user.followUser),
	auth.ensureLoggedIn,
	wrap(user.followUser)
);
// Unfollow a single user
router.delete("/user/:userId/follow",
	validate(user.unfollowUser),
	auth.ensureLoggedIn,
	wrap(user.unfollowUser)
);

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

// Get the site statistics
router.get("/stats",
	wrap(home.getStats)
);

module.exports = router;
