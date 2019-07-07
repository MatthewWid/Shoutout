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
