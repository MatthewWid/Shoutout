const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.register = async (req, res, next) => {
	res.send("Register");
};
