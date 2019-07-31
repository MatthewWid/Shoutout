const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("User");
const Like = mongoose.model("Like");

// Get an object of overall site statistics
const controller = async (req, res) => {
	const [users, posts, likes] = await Promise.all([
		User.countDocuments(),
		Post.countDocuments(),
		Like.countDocuments()
	]);

	res.json({
		success: true,
		stats: {
			users,
			posts,
			likes
		}
	});
};

module.exports = controller;
