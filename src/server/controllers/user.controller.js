const mongoose = require("mongoose");
const validator = require("express-validator");
const constants = require("../constants.js");
const ensureValidId = require("../helpers/ensureValidId.js");
const valErrMsg = require("../helpers/validationErrorMsg.js");
const User = mongoose.model("User");

// Get a single user by its ID
exports.getUser = async (req, res) => {
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
	})
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
	} else if (query.param["userName"]) {
		userName = req.param["userName"]
	}

	const user = await User.findOne({
		name: userName
	}, constants.PROJECTION_USER);


	if (user !== null) {
		req.foundUser = user;
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

	const {_id, nick, name, email, isAdmin, avatarUrl} = req.user;
	res.json({
		success: true,
		user: {
			_id,
			nick,
			name,
			email,
			isAdmin,
			avatarUrl
		}
	});
};

// Validation middleware for all user controllers
exports.validate = (method) => {
	switch (method) {
		case "getUser":
			return [
				validator.param("userId", valErrMsg.notExists("User ID"))
					.exists()
					.custom(ensureValidId)
			];
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
						.withMessage(valErrMsg.len("Username", 3, 50)),

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
