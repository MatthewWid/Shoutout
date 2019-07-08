const mongoose = require("mongoose");
const User = mongoose.model("User");

// Create a single user
exports.createUser = async (req, res, next) => {
	const {nick, username, email, password} = req.body;

	const newUser = new User({
		nick,
		name: username,
		email
	});
	const registeredUser = await User.register(newUser, password);

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
