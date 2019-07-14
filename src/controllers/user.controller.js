const mongoose = require("mongoose");
const validator = require("express-validator");
const ensureValidId = require("../helpers/ensureValidId.js");
const valErrMsg = require("../helpers/validationErrorMsg.js");
const User = mongoose.model("User");

// Get a single user by its ID
exports.getUser = async (req, res) => {
	const {userId} = req.params;

	const user = await User.findById(userId, "_id nick name email isAdmin avatarUrl");

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

	const {_id: id, nick, name, email, isAdmin, avatarUrl} = req.user;
	res.json({
		success: true,
		user: {
			id,
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
					}).withMessage(valErrMsg.len("Nickname", 1, 50)),
				
				validator.body("username", valErrMsg.notExists("Username"))
					.exists()
					.isString()
					.isAlphanumeric().withMessage(valErrMsg.alphaNum("Username"))
					.isLength({
						min: 1,
						max: 50
					}).withMessage(valErrMsg.len("Username", 3, 50)),

				validator.body("email", valErrMsg.notExists("Email"))
					.exists()
					.isString()
					.isEmail().withMessage(valErrMsg.notValid("Email")),

				validator.body("password", valErrMsg.notExists("Password"))
					.exists()
					.isString()
			]
		default:
			return [];
	}
};
