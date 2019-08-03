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

// Statics
// Attach a boolean indicating whether the current
// user is following the given user
// `followee` = User to check
// `user` = Logged in user
FollowSchema.statics.userFollowsUser = async function(followee, user) {
	// If the current user is not logged in then they're obviously not following
	if (!user) {
		return false;
	}

	const isFollowing = await this.countDocuments({
		followee: followee._id,
		follower: user._id
	});

	return isFollowing ? true : false;
};

// Model
module.exports = mongoose.model("Follow", FollowSchema);
