const mongoose = require("mongoose");
const validator = require("express-validator");
const User = mongoose.model("User");

// Get a single user by its ID
exports.getUser = async (req, res) => {
	const errors = validator.validationResult(req);
	if (!errors.isEmpty()) {
		res
			.status(400)
			.json({
				success: false,
				errors: errors.array()
			});
		return;
	}

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

// Ensure that the given user ID parameter is a valid Mongoose SchemaType.
exports.ensureValidId = (req, res, next) => {
	const {userId} = req.params;

	if (!userId) {
		return res
			.status(400)
			.json({
				success: false,
				msg: "No user ID given."
			});
	}
	if (!mongoose.Types.ObjectId.isValid(userId)) {
		return res
			.status(400)
			.json({
				success: false,
				msg: "User ID parameter contains invalid syntax."
			});
	}

	next();
};

// Validation middleware for all user controllers
exports.validate = (method) => {
	switch (method) {
		case "getUser":
			return [
				validator.param("userId", "A user ID must be supplied.").not().exists()
			];
		default:
			return [];
	}
}
