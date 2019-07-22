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
		unique: true,
		trim: true
	},
	email: {
		type: String,
		required: "Accounts require a valid email address.",
		trim: true
	},
	created: {
		type: Date,
		required: true,
		default: Date.now
	},
	avatarUrl: {
		type: String,
		default: "/images/avatar-default.png",
		trim: true
	},
	bannerUrl: {
		type: String,
		default: "/images/banner-default.png",
		trim: true
	},
	isAdmin: {
		type: Boolean,
		default: false
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
