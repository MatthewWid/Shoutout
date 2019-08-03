const mongoose = require("mongoose");
const Like = mongoose.model("Like");

// Remove a like from a single post
const controller = async (req, res) => {
	const {postId} = req.params;
	const {_id: userId} = req.user;

	const {deletedCount} = await Like.deleteOne({
		postId,
		userId
	});

	res.json({
		success: true,
		foundLike: deletedCount && true || false
	});
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
const ensureValidId = require("../../helpers/ensureValidId.js");
controller.validate = [
	validator.param("postId", valErrMsg.notExists("Post ID"))
		.exists()
		.custom(ensureValidId)
];

module.exports = controller;
