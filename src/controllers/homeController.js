const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

exports.ping = (req, res) => res.send("pong");

exports.indexPage = (req, res) => {
	res.render("index");
};

exports.getStats = async (req, res) => {
	const stats = {
		posts: 0,
		users: 0,
		likes: 0
	};

	stats.posts = await Post.countDocuments();
	stats.users = await User.countDocuments();
	stats.likes = await Post.getTotalLikes();

	res.json(stats);
};