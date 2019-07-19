const mongoose = require("mongoose");
const constants = require("../constants.js");
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
	}
}, {
	toJSON: {
		virtuals: true
	},
	toObject: {
		virtuals: true
	}
});

// Middleware
function autopopulate(next) {
	this
		.populate("author", constants.PROJECTION_USER)
		.populate("totalLikes");
	next();
}

// Hooks
PostSchema.pre("find", autopopulate);
PostSchema.pre("findOne", autopopulate);
PostSchema.pre("findById", autopopulate);
PostSchema.pre("findOneAndUpdate", autopopulate);

// Virtuals
/*
	TODO:
		Mongoose/MongoDB cannot sort by virtual fields yielding it impossible
		to retrieve posts in the order of most liked or even applying some
		special algorithm to the returned results whilst simulatenously limiting
		the amount of results to eb retrieved.

		A workaround must be used instead.
		Either:

		- Use an aggregate $lookup in each controller that retrieves any post.

			Not DRY unless	a new helper function is created

		- Store a hard (not virtual) field that stores the total likes the post has accumulated
		and whenever the `addLike` controller is triggered it increments it, and whenever the
		`removeLike` controller is triggered it decrements it.

			Could possibly make data out of sync - a Like must be added and THEN the like counter
			must be increased. The 'totalLikes' field would be independent from the *actual* amount
			of likes and would only be assumed to be correct.

		- Use a sub-document array of user IDs that have liked the post instead of having a
		separate model for 'Like's and count the length of the array.
		
			Documents have a hard 16MB limit and will use a lot more memory when an array of
			many posts with many posts is loaded.
*/
PostSchema.virtual("totalLikes", {
	ref: "Like",
	localField: "_id",
	foreignField: "postId",
	count: true
});

// Model
module.exports = mongoose.model("Post", PostSchema);
