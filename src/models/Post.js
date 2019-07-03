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
