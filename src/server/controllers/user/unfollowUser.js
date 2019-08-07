const mongoose = require("mongoose");
const Follow = mongoose.model("Follow");

// Remove a follow from a single user
const controller = async (req, res) => {
	const {userId: followeeId} = req.params;
	const {_id: followerId} = req.user;

	console.log(followeeId);

	const {deletedCount} = await Follow.deleteOne({
		follower: followerId,
		followee: followeeId
	});

	res.json({
		success: true,
		followStatus: false,
		foundFollow: deletedCount && true || false
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
