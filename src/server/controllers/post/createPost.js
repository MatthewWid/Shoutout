const mongoose = require("mongoose");
const {upload} = require("../../helpers/cloudinaryInterface.js");
const {PROJECTION_POST} = require("../../helpers/constants.js");
const Post = mongoose.model("Post");

// Create a single new post
const controller = async (req, res) => {
	const newFields = {
		text: req.body.text,
		author: req.user
	};

	if (req.body.image) {
		const image = await upload(
			req.body.image,
			[
				req.user._id,
				`@${req.user.name}`,
				"post"
			],
			[
				{
					width: 2000,
					height: 2000,
					crop: "limit",
					quality: "auto:good"
				}
			]
		);

		const {public_id, url, bytes: size} = image;

		newFields.image = {
			public_id,
			url,
			size
		};
	}

	const {_id: postId} = await Post.create(newFields);

	const post = await Post.findById(postId, PROJECTION_POST)
		.populate("author");

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
