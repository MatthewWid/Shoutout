module.exports = {
	createPost: require("./createPost.js"),
	getPostById: require("./getPostById.js"),
	editPost: require("./editPost.js"),
	deletePost: require("./deletePost.js"),
	getManyPosts: require("./getManyPosts.js"),
	getTopPosts: require("./getTopPosts.js"),
	getCuratedFeed: require("./getCuratedFeed.js"),
	addLike: require("./addLike.js"),
	removeLike: require("./removeLike.js"),
	ensurePostAuthor: require("./ensurePostAuthor.js")
};
