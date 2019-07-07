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

// Get a single post by its ID
exports.getPost = async (req, res) => {
	const {postId} = req.params;

	const post = await Post.findById(postId, "_id likes text author created shortId");

	if (post === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "Post not found or does not exist."
			});
	}

	res.json({
		success: true,
		post
	})
};

// Delete a single post
exports.deletePost = async (req, res) => {
	const {deletedCount} = await Post.deleteOne({
		_id: req.params.postId
	});

	res
		.json({
			success: true,
			foundPost: deletedCount && true || false
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

// Ensure that the currently authenticated user is the author of the given post
exports.ensurePostAuthor = async (req, res, next) => {
	const post = await Post.findById(req.params.postId);
	
	// ERROR If the post is not found / does not exist
	if (!post) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "Post does not exist."
			});
	}
	// ERROR If the logged in user is not the author of the post
	// Bypass this check if the logged in user is an administrator
	if (!post.author._id.equals(req.user._id) && !req.user.isAdmin) {
		return res
			.status(401)
			.json({
				success: false,
				msg: "Not authorised to operate on post."
			});
	}

	next();
};

exports.ensureValidId = (req, res, next) => {
	const {postId} = req.params;

	if (!postId) {
		return res
			.status(400)
			.json({
				success: false,
				msg: "No post ID given."
			});
	}
	if (!mongoose.Types.ObjectId.isValid(postId)) {
		return res
			.status(400)
			.json({
				success: false,
				msg: "Post ID parameter contains invalid syntax."
			});
	}

	next();
};
