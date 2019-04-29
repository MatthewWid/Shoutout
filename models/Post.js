const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	text: String,
	likes: {
		type: Number,
		default: 0
	},
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Post", postSchema);
