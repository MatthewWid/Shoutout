const mongoose = require("mongoose");
const {PROJECTION_USER} = require("../../helpers/constants.js");
const User = mongoose.model("User");
const Follow = mongoose.model("Follow");

// Get a single user by any given properties
const controller = async (req, res) => {
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

	let user = await User.findOne(findParams, PROJECTION_USER);

	if (user === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "User not found or does not exist."
			});
	}
	
	// Attach virtuals
	user = await user
		.populate("totalFollowers")
		.populate("totalFollowing")
		.execPopulate();
	user = user.toObject();

	// Indicate if logged in user is following retrieved user
	user.isFollowing = await Follow.userFollowsUser(user, req.user);

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
