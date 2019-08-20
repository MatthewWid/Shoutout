const mongoose = require("mongoose");
const {mongoose: createProjection} = require("../../helpers/convertProjection.js");
const {PROJECTION_POST} = require("../../helpers/constants.js");
const User = mongoose.model("User");
const Like = mongoose.model("Like");

const controller = async (req, res) => {
	// User filtering
	const findUser = {};

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
		.lookup({
			from: "posts",
			localField: "postId",
			foreignField: "_id",
			as: "post"
		})
		.unwind("post")
		.project(createProjection(PROJECTION_POST, "post"));

	likedList = likedList.map((post) => ({
		...post.post
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

module.exports = controller;
