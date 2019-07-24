const mongoose = require("mongoose");
const validator = require("express-validator");
const constants = require("../constants.js");
const ensureValidId = require("../helpers/ensureValidId.js");
const valErrMsg = require("../helpers/validationErrorMsg.js");
const User = mongoose.model("User");

// Get a single user by their ID
exports.getUserById = async (req, res) => {
	const {userId} = req.params;

	const user = await User.findById(userId, constants.PROJECTION_USER);

	if (user === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "User not found or does not exist."
			});
	}

	res.json({
		success: true,
		user
	});
};

// Get a single user by any given properties
exports.getUser = async (req, res) => {
	// If the user has been looked up and found by `findUserByName` then immediately
	// send back the found user instead of doing a second redundant lookup
	if (req.foundUser) {
		return res
			.json({
				success: true,
				user: req.foundUser
			});
	}

	// Filtering
	const findParams = {};

	// Username
	if (req.query.username) {
		findParams.name = req.query.username;
	}
	// Nickname
	if (req.query.nickname) {
		findParams.nick = req.query.nickname;
	}
	// Unique ID
	if (req.query.id) {
		findParams._id = req.query.id;
	}

	// If no filters were given abort the operation
	if (Object.keys(findParams).length === 0) {
		return res
			.status(400)
			.json({
				success: false,
				msg: "No filter parameters provided to user lookup."
			});
	}

	const user = await User.findOne(findParams, constants.PROJECTION_USER);

	if (user === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "User not found or does not exist."
			});
	}

	res.json({
		success: true,
		user
	});
};

// Get a single user by their unique username and attach it to the `request` object
exports.findUserByName = async (req, res, next) => {
	let userName = null;
	// If the search parameters have been serialized get the username from there
	if (
		((req.searchParams || {}).author || {})
			.name
	) {
		userName = req.searchParams.author.name;

	// Else get it from the query directly as 'authorname'
	} else if (req.query["authorname"]) {
		userName = req.query["authorname"];

	// Else get it from the query directly as 'username'
	} else if (req.query["username"]) {
		userName = req.query["username"];

	// Else get it from the paramater directly as 'userName'
	} else if (req.param["userName"]) {
		userName = req.param["userName"]
	}

	if (userName) {
		const user = await User.findOne({
			name: userName
		}, constants.PROJECTION_USER);

		req.foundUser = user || null;
	}

	next();
};

// Create a single user
exports.createUser = async (req, res, next) => {
	const {nick, username, email, password} = req.body;

	const newUser = new User({
		nick,
		name: username,
		email
	});
	const registeredUser = await User.register(newUser, password);

	res.status(201);

	next();
};

// Return the currently authenticated / logged in user
exports.getLoggedInUser = (req, res) => {
	if (!req.user) {
		return res.json({
			success: true,
			user: null
		});
	}

	const user = {...req.user};
	delete user.__v;
	res.json({
		success: true,
		user: req.user
	});
};

// Validation middleware for all user controllers
exports.validate = (method) => {
	switch (method) {
		case "getUserById":
			return [
				validator.param("userId", valErrMsg.notExists("User ID"))
					.exists()
					.custom(ensureValidId)
			];
		case "findUserByName":
			return [
				validator.query("authorname", valErrMsg.notValid("Author name"))
					.optional()
					.isString(),

				validator.query("username", valErrMsg.notValid("Username query"))
					.optional()
					.isString(),

				validator.param("userName", valErrMsg.notValid("Username paramater"))
					.optional()
					.isString()
			]
		case "createUser":
			return [
				validator.body("nick", valErrMsg.notExists("Nickname"))
					.optional()
					.isString()
					.isLength({
						min: 1,
						max: 50
					})
						.withMessage(valErrMsg.len("Nickname", 1, 50)),
				
				validator.body("username", valErrMsg.notExists("Username"))
					.exists()
					.isString()
					.isAlphanumeric()
						.withMessage(valErrMsg.alphaNum("Username"))
					.isLength({
						min: 1,
						max: 50
					})
						.withMessage(valErrMsg.len("Username", 3, 50))
					.custom((name) => !constants.FORBIDDEN_NAMES.includes(name.toLowerCase()))
						.withMessage(valErrMsg.notValid("Username")),

				validator.body("email", valErrMsg.notExists("Email"))
					.exists()
					.isString()
					.isEmail()
						.withMessage(valErrMsg.notValid("Email")),

				validator.body("password", valErrMsg.notExists("Password"))
					.exists()
					.isString()
			]
		default:
			return [];
	}
};
