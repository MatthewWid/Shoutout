const mongoose = require("mongoose");
const {POSTS_PER_PAGE, PROJECTION_POST, PROJECTION_USER} = require("../../helpers/constants.js");
const {mongoose: createProjection} = require("../../helpers/convertProjection.js");
const Post = mongoose.model("Post");
const User = mongoose.model("User");
const Like = mongoose.model("Like");

// Get a list of top posts sorted by total likes
const controller = async (req, res) => {
	// Filtering
	const find = {};
	if (req.query.authorid) {
		const {authorid: _id} = req.query;

		const user = await User.findById(_id);

		if (user === null) {
			return res
				.status(404)
				.json({
					success: false,
					msg: "User not found or does not exist"
				});
		}

		find.author = user._id;
	}
	// Pagination
	const page = {
		skip: req.query.page ? (req.query.page * POSTS_PER_PAGE) : 0,
		limit: POSTS_PER_PAGE
	};
	// Sorting
	const sort = {
		totalLikes: -1,
		"post.created": -1
	};
	// Projection
	const project = {
		totalLikes: 1,
		...createProjection(PROJECTION_POST, "post"),
		...createProjection(PROJECTION_USER, "post.author")
	};
	delete project["post.author"];

	let posts = await Post.aggregate()
		.match(find)
		// Fetch post likes into an array `likes`
		.lookup({
			from: "likes",
			localField: "_id",
			foreignField: "postId",
			as: "likes"
		})
		// Create field `totalLikes` that is the sum of
		// the size of the newly created `likes` array
		.group({
			_id: "$_id",
			totalLikes: {
				$sum: {
					$size: "$likes"
				}
			},
			post: {
				$first: "$$ROOT"
			}
		})
		.sort(sort)
		.skip(page.skip)
		.limit(page.limit)
		// Populate post author information
		.lookup({
			from: "users",
			localField: "post.author",
			foreignField: "_id",
			as: "post.author"
		})
		.unwind("post.author")
		.project(project);

	// Populate `isLiked` field and remove nested `post` object
	posts = await Promise.all(
		posts.map(async (post) => {
			const postNew = {
				...post,
				...post.post,
				isLiked: await Like.userLikedPost(post, req.user)
			};
			delete postNew.post;
			return postNew;
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

	validator.query("page", valErrMsg.notValid("Page number"))
		.optional()
		.isInt({min: 0})
];

module.exports = controller;
