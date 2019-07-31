const mongoose = require("mongoose");
const User = mongoose.model("User");

// Create a single user
const controller = async (req, res, next) => {
	const {nick, username, email, password} = req.body;

	const newUser = new User({
		nick,
		name: username,
		email
	});
	const registeredUser = await User.register(newUser, password);

	res.status(201);

	next();
};

// Validation
const validator = require("express-validator");
const {FORBIDDEN_NAMES} = require("../../constants.js");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
controller.validate = [
	validator.body("nick", valErrMsg.notExists("Nickname"))
		.optional()
		.isString()
		.isLength({
			min: 1,
			max: 50
		})
			.withMessage(valErrMsg.len("Nickname", 1, 50)),
	
	validator.body("username", valErrMsg.notExists("Username"))
		.exists()
		.isString()
		.isAlphanumeric()
			.withMessage(valErrMsg.alphaNum("Username"))
		.isLength({
			min: 1,
			max: 50
		})
			.withMessage(valErrMsg.len("Username", 3, 50))
		.custom((name) => !FORBIDDEN_NAMES.includes(name.toLowerCase()))
			.withMessage(valErrMsg.notValid("Username")),

	validator.body("email", valErrMsg.notExists("Email"))
		.exists()
		.isString()
		.isEmail()
			.withMessage(valErrMsg.notValid("Email")),

	validator.body("password", valErrMsg.notExists("Password"))
		.exists()
		.isString()
];

module.exports = controller;
