const router = require("express").Router();
const validate = require("../../middlewares/validate.js");
const wrap = require("../../helpers/wrapAsync");

const user = require("./user.controllers.js");
const auth = require("../auth/auth.controllers.js");

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
// Get a list of users a person follows or is following
router.get("/user/follow",
	validate(user.getFollowList),
	wrap(user.getFollowList)
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

module.exports = router;
