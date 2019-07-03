const passport = require("passport");

exports.login = passport.authenticate("local");

exports.logout = (req, res, next) => {
	req.logout();
	next();
};

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		return next({
			type: "auth",
			error: "User is not logged in"
		});
	}
};
