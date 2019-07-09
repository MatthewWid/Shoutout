const mongoose = require("mongoose");
const constants = require("../helpers/constants.js");
const randomstring = require("randomstring");

// Schema
const PostSchema = new mongoose.Schema({
	text: {
		type: String,
		required: "Post must contain text.",
		minlength: 3,
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
	}
}, {
	toJSON: {
		virtuals: true
	},
	toObject: {
		virtuals: true
	}
});

// Statics
PostSchema.statics.getTotalLikes = async function() {
	const [aggregate = {totalLikes: 0}] = await this.aggregate([
		{
			$group: {
				_id: null,
				totalLikes: {
					$sum: "$likes"
				}
			}
		}
	]);
	const {totalLikes} = aggregate;

	return totalLikes;
};

// Middleware
function autopopulate(next) {
	this
		.populate("author", constants.PROJECTION_USER)
		.populate("likes");
	next();
}

// Hooks
PostSchema.pre("find", autopopulate);
PostSchema.pre("findOne", autopopulate);
PostSchema.pre("findById", autopopulate);
PostSchema.pre("findOneAndUpdate", autopopulate);

// Virtuals
PostSchema.virtual("likes", {
	ref: "Like",
	localField: "_id",
	foreignField: "postId",
	count: true
});

// Model
module.exports = mongoose.model("Post", PostSchema);
