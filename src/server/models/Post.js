const mongoose = require("mongoose");
const {PROJECTION_USER} = require("../helpers/constants.js");
const randomstring = require("randomstring");

// Schema
const PostSchema = new mongoose.Schema({
	text: {
		type: String,
		required: "Post must contain text.",
		minlength: 1,
		maxlength: 140,
		trim: true
	},
	created: {
		type: Date,
		required: true,
		default: Date.now
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: "Posts must have an author.",
		ref: "User"
	},
	shortId: {
		type: String,
		required: true,
		default: () => randomstring.generate({
			length: 6,
			capitalization: "lowercase"
		})
	},
	image: {
		public_id: {
			type: String
		},
		url: {
			type: String
		},
		size: Number
	}
}, {
	toJSON: {
		virtuals: true
	},
	toObject: {
		virtuals: true
	}
});

// Virtuals
PostSchema.virtual("totalLikes", {
	ref: "Like",
	localField: "_id",
	foreignField: "postId",
	count: true
});

// Model
module.exports = mongoose.model("Post", PostSchema);
