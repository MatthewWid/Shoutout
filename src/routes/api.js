const router = require("express").Router();
const wrap = require("../helpers/wrapAsync");

const home = require("../controllers/home.controller.js");
const auth = require("../controllers/auth.controller.js");
const user = require("../controllers/user.controller.js");
const post = require("../controllers/post.controller.js");

// Debug API test response
router.get("/ping",
	home.ping
);

// Authenticate and return the user from a given session if the session is valid
router.get("/user/auth",
	user.getLoggedInUser
);
// Register a new user with a name, email and password
router.post("/user/register",
	wrap(user.createUser),
	auth.login,
	user.getLoggedInUser
);
// Log in as a user with a name and password
router.post("/user/login",
	auth.login,
	user.getLoggedInUser
);
// Log out of a user session
router.post("/user/logout",
	auth.logout,
	user.getLoggedInUser
);

// Create a new post
router.post("/post",
	auth.ensureLoggedIn,
	wrap(post.createPost)
);
// Delete a post
router.delete("/post/:postId",
	auth.ensureLoggedIn,
	wrap(post.ensurePostAuthor),
	wrap(post.deletePost)
);
// Get an array of all existing posts
router.get("/posts",
	wrap(post.getAllPosts)
);

// Get the site statistics
router.get("/stats",
	wrap(home.getStats)
);

module.exports = router;
