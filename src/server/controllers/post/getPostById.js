const mongoose = require("mongoose");
const {PROJECTION_POST} = require("../../constants.js");
const Post = mongoose.model("Post");
const Like = mongoose.model("Like");

// Get a single post by its ID
const controller = async (req, res) => {
	const {postId} = req.params;

	let post = await Post.findById(postId, {PROJECTION_POST});

	if (post === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "Post not found or does not exist."
			});
	}

	post = post.toObject();
	post.isLiked = await Like.userLikedPost(post, req.user);

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
		.custom(ensureValidId)
];

module.exports = controller;
