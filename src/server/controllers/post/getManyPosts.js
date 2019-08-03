const mongoose = require("mongoose");
const {POSTS_PER_PAGE} = require("../../helpers/constants.js");
const Post = mongoose.model("Post");
const User = mongoose.model("User");
const Like = mongoose.model("Like");

// Get all posts sorted by date
const controller = async (req, res) => {
	// Match documents
	const find = {};
	// Sort results
	const sort = {};
	// Pagination of results
	const page = {
		skip: 0,
		limit: POSTS_PER_PAGE
	};

	// Filter by information about the author
	// Either 'authorid', 'authorname' or 'authornick'
	if (Object.keys(req.query).some((e) => [
			"authorid",
			"authorname",
			"authornick"
		].includes(e)
	)) {
		const {authorid: _id, authorname: name, authornick: nickname} = req.query;
		const user = await User.findOne({
			// Fancy syntax to only include the property if it is defined - https://stackoverflow.com/a/40560953/2954591
			...(_id && {_id}),
			...(name && {name}),
			...(nickname && {nickname})
		}, "_id");

		// If an author was searched for but not found return an error
		if (user === null) {
			return res
				.status(404)
				.json({
					success: false,
					msg: "User not found or does not exist"
				});
		}

		// Else search posts by the found authors' ID
		find.author = user._id;
	}

	// Set set order
	if (req.query.sort) {
		switch (req.query.sort) {
			case "new":
				sort.created = -1;
				break;
			case "old":
				sort.created = 1;
				break;
		}
	} else {
		sort.created = -1;
	}

	// Pagination
	if (req.query.page) {
		page.skip = req.query.page * POSTS_PER_PAGE;
	}

	// Aggregation search
	const posts = await Post.aggregate()
		.match(find)
		.sort(sort)
		.skip(page.skip)
		.limit(page.limit);

	res.json({
		success: true,
		posts
	});
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
const ensureValidId = require("../../helpers/ensureValidId.js");
controller.validate = [
	validator.query("authorid", valErrMsg.notValid("Author ID"))
		.optional()
		.custom(ensureValidId),

	validator.query("authorname", valErrMsg.notValid("Username query"))
		.optional()
		.isString(),

	validator.param("authornick", valErrMsg.notValid("Username paramater"))
		.optional()
		.isString(),

	validator.query("sort", valErrMsg.notValid("Sort order type"))
		.optional()
		.isIn(["top", "trending", "new", "old"]),

	validator.query("page", valErrMsg.notValid("Page number"))
		.optional()
		.isInt({min: 0})
];

module.exports = controller;
