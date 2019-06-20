const passport = require("passport");

exports.login = passport.authenticate("local");

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		console.error("SERVER User is not authenticated.");
	}
}
