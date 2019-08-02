const mongoose = require("mongoose");
const {PROJECTION_POST} = require("../../helpers/constants.js");
const Post = mongoose.model("Post");

// Create a single new post
const controller = async (req, res) => {
	const {text} = req.body;

	const {_id: postId} = await Post.create({
		text,
		author: req.user
	});

	const post = await Post.findById(postId, PROJECTION_POST);

	res
		.status(201)
		.json({
			success: true,
			post
		});
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
controller.validate = [
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
