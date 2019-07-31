const mongoose = require("mongoose");
const {PROJECTION_USER} = require("../../constants.js");
const User = mongoose.model("User");

// Get a single user by their unique username and attach it to the `request` object
const controller = async (req, res, next) => {
	let userName = null;
	// If the search parameters have been serialized get the username from there
	if (
		((req.searchParams || {}).author || {})
			.name
	) {
		userName = req.searchParams.author.name;

	// Else get it from the query directly as 'authorname'
	} else if (req.query["authorname"]) {
		userName = req.query["authorname"];

	// Else get it from the query directly as 'username'
	} else if (req.query["username"]) {
		userName = req.query["username"];

	// Else get it from the paramater directly as 'userName'
	} else if (req.param["userName"]) {
		userName = req.param["userName"]
	}

	if (userName) {
		const user = await User.findOne({
			name: userName
		}, PROJECTION_USER);

		req.foundUser = user || null;
	}

	next();
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
controller.validate = [
	validator.query("authorname", valErrMsg.notValid("Author name"))
		.optional()
		.isString(),

	validator.query("username", valErrMsg.notValid("Username query"))
		.optional()
		.isString(),

	validator.param("userName", valErrMsg.notValid("Username paramater"))
		.optional()
		.isString()
];

module.exports = controller;
