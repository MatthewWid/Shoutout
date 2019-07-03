const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Schema
const userSchema = new mongoose.Schema({
	nick: {
		type: String,
		default: "",
		trim: true
	},
	name: {
		type: String,
		required: "Accounts require a valid username.",
		trim: true
	},
	email: {
		type: String,
		required: "Accounts require a valid email address.",
		trim: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

// Plugins
userSchema.plugin(passportLocalMongoose, {
	usernameField: "email"
});

// Hooks
userSchema.pre("save", function(next) {
	if (!this.nick || this.nick.length === 0) {
		this.nick = this.name;
	}

	next();
});

// Model
module.exports = mongoose.model("User", userSchema);
