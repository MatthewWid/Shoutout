const mongoose = require("mongoose");
const {POSTS_PER_PAGE} = require("../../helpers/constants.js");
const Post = mongoose.model("Post");
const Like = mongoose.model("Like");

// Get all posts sorted by date
const controller = async (req, res) => {
	// Pagination
	const pageSkip = POSTS_PER_PAGE * req.searchParams.page;

	// Sort results
	const {sort: sortType} = req.searchParams;
	const sort = {};
	if (sortType === "new") {
		sort.created = -1;
	}
	if (sortType === "old") {
		sort.created = 1;
	}

	// Get results
	let posts = await Post.find(req.findParams || {})
		.skip(pageSkip)
		.limit(POSTS_PER_PAGE)
		.sort(sort);

	// Set 'isLiked' property on each post
	// Run in parallel and wait for all count operations to complete
	posts = await Promise.all(
		posts.map(async (post) => {
			post = post.toObject();

			post.isLiked = await Like.userLikedPost(post, req.user);

			return post;
		})
	);

	res.json({
		success: true,
		posts
	});
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
const ensureValidId = require("../../helpers/ensureValidId.js");
controller.validate = [
	validator.query("authorid", valErrMsg.notValid("Author ID"))
		.optional()
		.custom(ensureValidId),

	validator.query("sort", valErrMsg.notValid("Sort order type"))
		.optional()
		.isIn(["top", "trending", "new", "old"]),

	validator.query("page", valErrMsg.notValid("Page number"))
		.optional()
		.isInt({min: 0})
];

module.exports = controller;
