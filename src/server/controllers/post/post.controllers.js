module.exports = {
	createPost: require("./createPost.js"),
	editPost: require("./editPost.js"),
	deletePost: require("./deletePost.js"),
	getManyPosts: require("./getManyPosts.js"),
	getTopPosts: require("./getTopPosts.js"),
	getCuratedFeed: require("./getCuratedFeed.js"),
	getLikedPosts: require("./getLikedPosts.js"),
	addLike: require("./addLike.js"),
	removeLike: require("./removeLike.js"),
	ensurePostAuthor: require("./ensurePostAuthor.js")
};
