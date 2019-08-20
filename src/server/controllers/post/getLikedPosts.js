const mongoose = require("mongoose");
const {mongoose: createProjection} = require("../../helpers/convertProjection.js");
const {PROJECTION_POST, PROJECTION_USER} = require("../../helpers/constants.js");
const User = mongoose.model("User");
const Like = mongoose.model("Like");

/*
	TODO:
	Pagination
*/
const controller = async (req, res) => {
	// User filtering
	const findUser = {};
	// Sorting
	const sort = {
		created: -1
	};
	// Projection
	const project = {
		...createProjection(PROJECTION_POST, "post"),
		...createProjection(PROJECTION_USER, "author")
	};

	// Username
	if (req.query.username) {
		findUser.name = req.query.username;
	}
	// Unique ID
	if (req.query.userid) {
		findUser._id = req.query.userid;
	}

	const user = await User.findOne(findUser);
	
	if (user === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "User not found or does not exist."
			});
	}

	let likedList = await Like.aggregate()
		.match({
			userId: user._id
		})
		.sort(sort)
		.lookup({
			from: "posts",
			localField: "postId",
			foreignField: "_id",
			as: "post"
		})
		.lookup({
			from: "users",
			localField: "post.author",
			foreignField: "_id",
			as: "author"
		})
		.unwind("post")
		.unwind("author")
		.project(project);

	likedList = likedList.map((post) => ({
		...post.post,
		author: post.author
	}));

	// Populate `totalLikes` and `isLiked` field
	likedList = await Promise.all(
		likedList.map(async (post) => {
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
		posts: likedList
	});
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
const ensureValidId = require("../../helpers/ensureValidId.js");
controller.validate = [
	validator.oneOf([
		validator.query("userid", valErrMsg.notValid("User ID"))
			.exists()
			.custom(ensureValidId),

		validator.query("username", valErrMsg.notValid("Username"))
			.exists()
			.isString()
	], valErrMsg.filters("User liked posts"))
];

module.exports = controller;
