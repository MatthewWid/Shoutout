const mongoose = require("mongoose");
const {PROJECTION_POST} = require("../../helpers/constants.js");
const Post = mongoose.model("Post");
const Like = mongoose.model("Like");

// Get a single post by any given properties
const controller = async (req, res) => {
	// Filtering
	const findParams = {};

	// Author ID
	if (req.query.authorid) {
		findParams.author = req.query.authorid;
	}
	// Unique ID
	if (req.query.id) {
		findParams._id = req.query.id;
	}
	// Shortlink
	if (req.query.shortId) {
		findParams.shortId = req.query.shortId;
	}

	let post = await Post.findOne(findParams, PROJECTION_POST);

	if (post === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "Post not found or does not exist."
			});
	}

	// Attach virtuals
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
	validator.oneOf([
		validator.query("authorid", valErrMsg.notValid("Post author ID"))
			.custom(ensureValidId),

		validator.query("id", valErrMsg.notValid("Post ID"))
			.custom(ensureValidId),

		validator.query("shortId", valErrMsg.notValid("Shortlink"))
			.isString()
	], valErrMsg.filters("Post"))
];

module.exports = controller;
