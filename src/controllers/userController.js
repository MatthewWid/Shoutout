const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.register = async (req, res, next) => {
	// const newUser = new User({
	// 	name: "Matthew",
	// 	email: "mianamal12@gmail.com"
	// });
	// await User.register(newUser, "hunter2")
	res.status("200").send("Attempted to register.");
};
