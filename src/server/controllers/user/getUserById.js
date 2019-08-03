const mongoose = require("mongoose");
const {PROJECTION_USER} = require("../../helpers/constants.js");
const User = mongoose.model("User");

// Get a single user by their ID
const controller = async (req, res) => {
	const {userId} = req.params;

	const foundUser = await User.findById(userId, PROJECTION_USER);
	const user = await foundUser
		.populate("totalFollowers")
		.populate("totalFollowing")
		.execPopulate();

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
	validator.param("userId", valErrMsg.notExists("User ID"))
		.exists()
		.custom(ensureValidId)
];

module.exports = controller;
