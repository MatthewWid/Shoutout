const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.createUser = async (req, res, next) => {
	const {username, email, password} = req.body;

	const newUser = new User({
		name: username,
		email: email
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

	const {_id: id, name, email, isAdmin} = req.user;
	res.json({
		user: {
			id,
			name,
			email,
			isAdmin
		}
	});
};
