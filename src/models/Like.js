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

LikeSchema.index({
	userId: 1,
	postId: 1
}, {
	unique: true
});

// Model
module.exports = mongoose.model("Like", LikeSchema);
