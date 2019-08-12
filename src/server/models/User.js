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
	avatar: {
		public_id: {
			type: String,
			default: null
		},
		url: {
			type: String,
			default: "/images/avatar-default.png"
		}
	},
	banner: {
		public_id: {
			type: String,
			default: null
		},
		url: {
			type: String,
			default: "/images/banner-default.png"
		}
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
}, {
	toJSON: {
		virtuals: true
	},
	toObject: {
		virtuals: true
	}
});

// Plugins
UserSchema.plugin(passportLocalMongoose, {
	usernameField: "name"
});

// Hooks
UserSchema.pre("save", function(next) {
	// If the user did not give an initial nickname
	// set their nickname to their username
	if (!this.nick || this.nick.length === 0) {
		this.nick = this.name;
	}

	next();
});

// Virtuals
// Total users following this user
UserSchema.virtual("totalFollowers", {
	ref: "Follow",
	localField: "_id",
	foreignField: "followee",
	count: true
});
// Total users this user is following
UserSchema.virtual("totalFollowing", {
	ref: "Follow",
	localField: "_id",
	foreignField: "follower",
	count: true
});

// Model
module.exports = mongoose.model("User", UserSchema);
