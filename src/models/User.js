const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Schema
const UserSchema = new mongoose.Schema({
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
	},
	avatarUrl: {
		type: String,
		trim: true
	}
});

// Plugins
UserSchema.plugin(passportLocalMongoose, {
	usernameField: "email"
});

// Hooks
UserSchema.pre("save", function(next) {
	if (!this.nick || this.nick.length === 0) {
		this.nick = this.name;
	}

	next();
});

// Model
module.exports = mongoose.model("User", UserSchema);
