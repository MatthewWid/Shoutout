const mongoose = require("mongoose");

// Schema
const LikeSchema = new mongoose.Schema({
	created: {
		type: Date,
		required: true,
		default: Date.now
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
	},
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Post"
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
