const mongoose = require("mongoose");
const {PROJECTION_USER} = require("../../helpers/constants.js");
const User = mongoose.model("User");

// Get a single user by their unique username and attach it to the `request` object
const controller = async (req, res, next) => {
	const user = await User.findOne({
		name: req.query.username || null,
		nickname: req.query.nickname || null
	}, PROJECTION_USER);

	req.foundUser = user;

	next();
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
controller.validate = [
	validator.query("username", valErrMsg.notValid("Username query"))
		.optional()
		.isString(),

	validator.param("nickname", valErrMsg.notValid("Username paramater"))
		.optional()
		.isString()
];

module.exports = controller;
