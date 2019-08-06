const mongoose = require("mongoose");
const {POSTS_PER_PAGE, PROJECTION_POST, PROJECTION_USER} = require("../../helpers/constants.js");
const {mongoose: createProjection} = require("../../helpers/convertProjection.js");
const Post = mongoose.model("Post");
const User = mongoose.model("User");
const Like = mongoose.model("Like");
const Follow = mongoose.model("Follow");

// Get the users' curated personalised post feed
const controller = async (req, res) => {
	// Filtering
	const find = {};
	// Pagination
	const page = {
		skip: req.query.page ? (req.query.page * POSTS_PER_PAGE) : 0,
		limit: POSTS_PER_PAGE
	};
	// Sorting
	const sort = {
		"post.created": -1
	};
	// Projection
	const project = {
		...createProjection(PROJECTION_POST),
		...createProjection(PROJECTION_USER, "author")
	};
	delete project.author; // Avoid conflicting fields

	let following = await Follow.find({
		follower: req.user._id
	});
	following = following.map((follow) => (
		follow.followee
	));

	find.author = {
		$in: following
	};

	let posts = await Post.aggregate()
		.match(find)
		.sort(sort)
		.skip(page.skip)
		.limit(page.limit)
		.lookup({
			from: "users",
			localField: "author",
			foreignField: "_id",
			as: "author"
		})
		.unwind("author")
		.project(project);
	
	// Populate `totalLikes` and `isLiked` field
	posts = await Promise.all(
		posts.map(async (post) => {
			const [totalLikes, isLiked] = await Promise.all([
				Like.countDocuments({postId: post._id}),
				Like.userLikedPost(post, req.user)
			]);

			return {
				...post,
				totalLikes,
				isLiked
			};
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
	validator.query("page", valErrMsg.notValid("Page number"))
		.optional()
		.isInt({min: 0})
];

module.exports = controller;
