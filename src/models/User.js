const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Schema
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

// Plugins
userSchema.plugin(passportLocalMongoose, {
	usernameField: "email"
});

// Model
module.exports = mongoose.model("User", userSchema);
