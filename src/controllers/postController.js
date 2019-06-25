const mongoose = require("mongoose");
const Post = mongoose.model("Post");

// Create a single new post
exports.createPost = async (req, res) => {
	const {text} = req.body;

	const post = await (new Post({
		text
	})).save();

	res.json(post);
};

// Get all posts sorted by date
exports.getAllPosts = async (req, res) => {
	const posts = await Post.find()
		.sort({
			created: -1
		});

	res.json(posts);
};
