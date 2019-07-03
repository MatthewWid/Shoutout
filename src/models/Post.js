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
		required: true,
		default: 0,
		min: 0
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
	}
});

postSchema.statics.getTotalLikes = async function() {
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

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
