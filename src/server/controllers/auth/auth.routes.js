const router = require("express").Router();
const validate = require("../../middlewares/validate.js");
const wrap = require("../../helpers/wrapAsync");

const auth = require("./auth.controllers.js");
const user = require("../user/user.controllers.js");

// Authenticate and return the user from a given session if the session is valid
router.get("/user/auth",
	user.getLoggedInUser
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

module.exports = router;
