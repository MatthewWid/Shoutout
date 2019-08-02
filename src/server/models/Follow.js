const mongoose = require("mongoose");

// Schema
const FollowSchema = new mongoose.Schema({
	created: {
		type: Date,
		required: true,
		default: Date.now
	},
	// Person following the user
	follower: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
	},
	// Person being followed
	followee: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
	}
});

// Indexes
FollowSchema.index({
	follower: 1,
	followee: 1
}, {
	unique: true
});

// Model
module.exports = mongoose.model("Follow", FollowSchema);
