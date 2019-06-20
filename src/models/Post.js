const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	text: {
		type: String,
		required: "Post must contain text.",
		minlength: 3,
		maxlength: 140,
		trim: true
	},
	likes: {
		type: Number,
		default: 0,
		min: 0
	},
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Post", postSchema);
