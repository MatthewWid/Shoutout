const passport = require("passport");
const validator = require("express-validator");
const valErrMsg = require("../helpers/validationErrorMsg.js");

// Log the user in given a username and password
exports.login = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res
				.status(401)
				.json({
					success: false,
					msg: "Username or password is incorrect."
				});
		}

		req.logIn(user, (err) => next(err));
	})(req, res, next);
};

// Log the user out
exports.logout = (req, res) => {
	req.logout();
	
	res.json({
		success: true
	});
};

// Ensure that the current session contains an authenticated user
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

// Validation middleware for all auth controllers
exports.validate = (method) => {
	switch (method) {
		case "login":
			return [
				validator.body("email")
					.exists()
					.isString()
					.isEmail()
						.withMessage(valErrMsg.notValid("Email")),

				validator.body("password")
					.exists()
					.isString()
			];
		default:
			return [];
	}
};
