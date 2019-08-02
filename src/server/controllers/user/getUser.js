const mongoose = require("mongoose");
const {PROJECTION_USER} = require("../../helpers/constants.js");
const User = mongoose.model("User");

// Get a single user by any given properties
const controller = async (req, res) => {
	// If the user has been looked up and found by `findUserByName` then immediately
	// send back the found user instead of doing a second redundant lookup
	if (req.foundUser) {
		return res
			.json({
				success: true,
				user: req.foundUser
			});
	}

	// Filtering
	const findParams = {};

	// Username
	if (req.query.username) {
		findParams.name = req.query.username;
	}
	// Nickname
	if (req.query.nickname) {
		findParams.nick = req.query.nickname;
	}
	// Unique ID
	if (req.query.id) {
		findParams._id = req.query.id;
	}

	// If no filters were given abort the operation
	if (Object.keys(findParams).length === 0) {
		return res
			.status(400)
			.json({
				success: false,
				msg: "No filter parameters provided to user lookup."
			});
	}

	const user = await User.findOne(findParams, PROJECTION_USER);

	if (user === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "User not found or does not exist."
			});
	}

	res.json({
		success: true,
		user
	});
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
const ensureValidId = require("../../helpers/ensureValidId.js");
controller.validate = [
	validator.oneOf([
		validator.query("username", valErrMsg.notValid("Username"))
			.isString(),

		validator.query("nickname", valErrMsg.notValid("Nickname"))
			.isString(),

		validator.query("id", valErrMsg.notValid("User ID"))
			.custom(ensureValidId)
	], valErrMsg.filters("User"))
];

module.exports = controller;
