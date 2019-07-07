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
		res
			.status(401)
			.json({
				success: false,
				msg: "You need to be logged in to do that."
			});
	}
};
