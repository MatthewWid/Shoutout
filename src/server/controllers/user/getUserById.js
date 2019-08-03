const mongoose = require("mongoose");
const {PROJECTION_USER} = require("../../helpers/constants.js");
const User = mongoose.model("User");
const Follow = mongoose.model("Follow");

// Get a single user by their ID
const controller = async (req, res) => {
	const {userId} = req.params;

	let user = await User.findById(userId, PROJECTION_USER);

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
	validator.param("userId", valErrMsg.notExists("User ID"))
		.exists()
		.custom(ensureValidId)
];

module.exports = controller;
