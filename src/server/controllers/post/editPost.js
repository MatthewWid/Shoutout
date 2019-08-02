const mongoose = require("mongoose");
const {PROJECTION_POST} = require("../../helpers/constants.js");
const Post = mongoose.model("Post");

// Update a single post
const controller = async (req, res) => {
	const {postId} = req.params;
	const {text} = req.body;

	const post = await Post.findByIdAndUpdate(postId, {
		text
	}, {
		select: PROJECTION_POST,
		new: true
	});

	if (post === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "Post not found or does not exist."
			});
	}

	res.json({
		success: true,
		post
	});
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
const ensureValidId = require("../../helpers/ensureValidId.js");
controller.validate = [
	validator.param("postId", valErrMsg.notExists("Post ID"))
		.exists()
		.custom(ensureValidId),

	validator.body("text", valErrMsg.notExists("Post text"))
		.exists()
		.isString()
		.isAscii()
			.withMessage(valErrMsg.chars("Post text"))
		.isLength({
			min: 1,
			max: 140
		})
			.withMessage(valErrMsg.len("Post text", 1, 140))
];

module.exports = controller;
