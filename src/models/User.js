const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true
	}
});

userSchema.plugin(passportLocalMongoose, {
	usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);
