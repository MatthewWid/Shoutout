const mongoose = require("mongoose");
const validator = require("express-validator");
const constants = require("../constants.js");
const {POSTS_PER_PAGE: perPage} = constants;
const ensureValidId = require("../helpers/ensureValidId.js");
const valErrMsg = require("../helpers/validationErrorMsg.js");
const Post = mongoose.model("Post");
const Like = mongoose.model("Like");

// Create a single new post
exports.createPost = async (req, res) => {
	const {text} = req.body;

	const {_id: postId} = await Post.create({
		text,
		author: req.user
	});

	const post = await Post.findById(postId, constants.PROJECTION_POST);

	res
		.status(201)
		.json({
			success: true,
			post
		});
};

// Get a single post by its ID
exports.getPostById = async (req, res) => {
	const {postId} = req.params;

	let post = await Post.findById(postId, constants.PROJECTION_POST);

	if (post === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "Post not found or does not exist."
			});
	}

	post = post.toObject();
	post.isLiked = await Like.userLikedPost(post, req.user);

	res.json({
		success: true,
		post
	});
};

// Update a single post
exports.editPost = async (req, res) => {
	const {postId} = req.params;
	const {text} = req.body;

	const post = await Post.findByIdAndUpdate(postId, {
		text
	}, {
		select: constants.PROJECTION_POST,
		new: true
	});

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
	});
};

// Delete a single post
exports.deletePost = async (req, res) => {
	const {deletedCount} = await Post.deleteOne({
		_id: req.params.postId
	});
	const {deletedCount: deletedLikes} = await Like.deleteMany({
		postId: req.params.postId
	});

	res
		.json({
			success: true,
			foundPost: deletedCount && true || false,
			foundLikes: deletedLikes
		});
};

// Serialize query parameters and attach to `searchParams` property on the request object
exports.serializeSearchParams = (req, res, next) => {
	const searchParams = {};

	// Filter by author ID
	if (req.query["authorid"]) {
		// Attach 'author' object to filter if searching by author
		searchParams.author = searchParams.author || {};

		searchParams.author._id = req.query["authorid"];
	}

	// Filter by author username
	if (req.query["authorname"]) {
		searchParams.author = searchParams.author || {};

		searchParams.author.name = req.query["authorname"];
	}

	// Sort results (Top, trending, new, old, etc.)
	if (req.query["sort"]) {
		searchParams.sort = req.query["sort"];
	} else {
		searchParams.sort = "new";
	}

	// Page number
	if (req.query["page"]) {
		searchParams.page = req.query["page"];
	} else {
		searchParams.page = 0;
	}

	req.searchParams = searchParams;

	next();
};

// Get all posts sorted by date
exports.getManyPosts = async (req, res) => {
	// Filter results
	const findParams = {};
	if ((req.searchParams.author || {})._id) {
		findParams.author = {
			_id: req.searchParams.author._id
		};
	}
	// If an author was found by username
	if (req.foundUser) {
		findParams.author = {
			_id: req.foundUser._id
		};
	// If an author was searched for but not found
	} else if (req.foundUser === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "User not found or does not exist"
			});
	}

	// Pagination
	const pageSkip = perPage * req.searchParams.page;

	// Sort results
	const {sort: sortType} = req.searchParams;
	const sort = {};
	if (sortType === "new") {
		sort.created = -1;
	}
	if (sortType === "old") {
		sort.created = 1;
	}

	// Get results
	let posts = await Post.find(findParams)
		.skip(pageSkip)
		.limit(perPage)
		.sort(sort);

	// Set 'isLiked' property on each post
	// Run in parallel and wait for all count operations to complete
	posts = await Promise.all(
		posts.map(async (post) => {
			post = post.toObject();

			post.isLiked = await Like.userLikedPost(post, req.user);

			return post;
		})
	);

	res.json({
		success: true,
		posts
	});
};

// Add a like to a single post
exports.addLike = async (req, res) => {
	const {postId} = req.params;
	const {_id: userId} = req.user;

	try {
		await Like.create({
			postId,
			userId
		});
	} catch (err) {
		return res
			.status(409)
			.json({
				success: false,
				msg: "Post already liked."
			});
	}

	res
		.status(201)
		.json({
			success: true
		});
};

// Remove a like from a single post
exports.removeLike = async (req, res) => {
	const {postId} = req.params;
	const {_id: userId} = req.user;

	const {deletedCount} = await Like.deleteOne({
		postId,
		userId
	});

	res
		.status(200)
		.json({
			success: true,
			foundLike: deletedCount && true || false
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

// Validation middleware for all post controllers
exports.validate = (method) => {
	switch (method) {
		case "createPost":
			return [
				validator.body("text", valErrMsg.notExists("Post text"))
					.exists()
					.isString()
					.isAscii()
						.withMessage(valErrMsg.chars("Post text"))
					.isLength({
						min: 1,
						max: 140
					})
						.withMessage(valErrMsg.len("Post text", 1, 140))
			];
		case "getPostById":
			return [
				validator.param("postId", valErrMsg.notExists("Post ID"))
					.exists()
					.custom(ensureValidId)
			];
		case "editPost":
			return [
				validator.param("postId", valErrMsg.notExists("Post ID"))
					.exists()
					.custom(ensureValidId),

				validator.body("text", valErrMsg.notExists("Post text"))
					.exists()
					.isString()
					.isAscii()
						.withMessage(valErrMsg.chars("Post text"))
					.isLength({
						min: 1,
						max: 140
					})
						.withMessage(valErrMsg.len("Post text", 1, 140))
			];
		case "deletePost":
			return [
				validator.param("postId", valErrMsg.notExists("Post Id"))
					.exists()
					.custom(ensureValidId)
			];
		case "getManyPosts":
			return [
				validator.query("authorid", valErrMsg.notValid("Author ID"))
					.optional()
					.custom(ensureValidId),

				validator.query("sort", valErrMsg.notValid("Sort order type"))
					.optional()
					.isIn(["top", "trending", "new", "old"]),

				validator.query("page", valErrMsg.notValid("Page number"))
					.optional()
					.isInt({min: 0})
			];
		case "addLike":
			return [
				validator.param("postId", valErrMsg.notExists("Post ID"))
					.exists()
					.custom(ensureValidId)
			];
		case "removeLike":
			return [
				validator.param("postId", valErrMsg.notExists("Post ID"))
					.exists()
					.custom(ensureValidId)
			];
		default:
			return [];
	}
};
