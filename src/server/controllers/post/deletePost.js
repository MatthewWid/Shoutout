const mongoose = require("mongoose");
const {destroy} = require("../../helpers/cloudinary.interface.js");
const Post = mongoose.model("Post");
const Like = mongoose.model("Like");

// Delete a single post
const controller = async (req, res) => {
	const prevPost = await Post.findById(req.params.postId);

	if (prevPost.image.public_id) {
		await destroy(prevPost.image.public_id);
	}

	const {deletedCount} = await Post.deleteOne({
		_id: req.params.postId
	});
	const {deletedCount: deletedLikes} = await Like.deleteMany({
		postId: req.params.postId
	});

	res
		.json({
			success: true,
			foundPost: deletedCount && true || false,
			foundLikes: deletedLikes
		});
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
const ensureValidId = require("../../helpers/ensureValidId.js");
controller.validate = [
	validator.param("postId", valErrMsg.notExists("Post Id"))
		.exists()
		.custom(ensureValidId)
];

module.exports = controller;
