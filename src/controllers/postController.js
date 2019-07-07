const mongoose = require("mongoose");
const Post = mongoose.model("Post");

// Create a single new post
exports.createPost = async (req, res) => {
	const {text} = req.body;

	const post = await (new Post({
		text,
		author: req.user
	})).save();

	res.json({
		success: true,
		post
	});
};

// Get all posts sorted by date
exports.getAllPosts = async (req, res) => {
	const posts = await Post.find()
		.sort({
			created: -1
		});

	res.json({
		success: true,
		posts
	});
};
