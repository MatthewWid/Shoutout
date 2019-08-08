const passport = require("passport");

// Log the user in given a username and password
const controller = (req, res, next) => {
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

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
controller.validate = [
	validator.body("name", valErrMsg.notExists("Username"))
		.exists()
		.isString(),

	validator.body("password", valErrMsg.notExists("Password"))
		.exists()
		.isString()
];

module.exports = controller;
