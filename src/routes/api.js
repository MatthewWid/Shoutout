const router = require("express").Router();
const wrap = require("../helpers/wrapAsync");

const homeController = require("../controllers/homeController.js");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");
const postController = require("../controllers/postController.js");

// Debug API test response
router.get("/ping",
	homeController.ping
);

// Authenticate and return the user from a given session if the session is valid
router.get("/user/auth",
	userController.getLoggedInUser
);
// Register a new user with a name, email and password
router.post("/user/register",
	userController.createUser,
	authController.login,
	userController.getLoggedInUser
);
// Log in as a user with a name and password
router.post("/user/login",
	authController.login,
	userController.getLoggedInUser
);

// Create a new post
router.post("/post",
	wrap(postController.createPost)
);
// Get an array of all existing posts
router.get("/posts",
	wrap(postController.getAllPosts)
);

module.exports = router;
