const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("User");
const Like = mongoose.model("Like");

exports.ping = (req, res) => res.send("pong");

// Render the 'index' view
exports.indexPage = (req, res) => {
	res.render("index");
};

// Get an object of overall site statistics
exports.getStats = async (req, res) => {
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
