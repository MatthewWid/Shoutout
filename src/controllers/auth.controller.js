const passport = require("passport");

exports.login = passport.authenticate("local");

exports.logout = (req, res, next) => {
	req.logout();
	next();
};

exports.ensureLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res
			.status(401)
			.json({
				success: false,
				msg: "User failed to authenticate."
			});
	}
};
