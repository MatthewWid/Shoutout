const mongoose = require("mongoose");
const Like = mongoose.model("Like");

// Add a like to a single post
const controller = async (req, res) => {
	const {postId} = req.params;
	const {_id: userId} = req.user;

	try {
		await Like.create({
			postId,
			userId
		});
	} catch (err) {
		return res
			.status(409)
			.json({
				success: false,
				msg: "Post already liked."
			});
	}

	res
		.status(201)
		.json({
			success: true
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
