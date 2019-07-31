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
	validator.body("email")
		.exists()
		.isString()
		.isEmail()
			.withMessage(valErrMsg.notValid("Email")),

	validator.body("password")
		.exists()
		.isString()
];

module.exports = controller;
