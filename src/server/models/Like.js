const mongoose = require("mongoose");

// Schema
const LikeSchema = new mongoose.Schema({
	created: {
		type: Date,
		required: true,
		default: Date.now
	},
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Post"
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
	}
});

// Indexes
LikeSchema.index({
	userId: 1,
	postId: 1
}, {
	unique: true
});

// Statics
// Attach a boolean indicating whether the
// logged in user has liked the post or not
LikeSchema.statics.userLikedPost = async function(post, user) {
	if (!user) {
		return false;
	}

	const isLiked = await this.countDocuments({
		postId: post._id,
		userId: user._id
	});

	return isLiked ? true : false;
};

// Model
module.exports = mongoose.model("Like", LikeSchema);
