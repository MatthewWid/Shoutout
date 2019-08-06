const mongoose = require("mongoose");
const {POSTS_PER_PAGE, PROJECTION_POST, PROJECTION_USER} = require("../../helpers/constants.js");
const {mongoose: createProjection} = require("../../helpers/convertProjection.js");
const Post = mongoose.model("Post");
const Like = mongoose.model("Like");

// Get a list of top posts sorted by total likes
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
		.lookup({
			from: "likes",
			localField: "_id",
			foreignField: "postId",
			as: "likes"
		})
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

module.exports = controller;
