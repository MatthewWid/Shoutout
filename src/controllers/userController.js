const mongoose = require("mongoose");
const User = mongoose.model("User");

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

exports.getLoggedInUser = (req, res) => {
	if (!req.user) {
		return res.json({
			user: null
		});
	}

	const {_id: id, nick, name, email, isAdmin, avatarUrl} = req.user;
	res.json({
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
