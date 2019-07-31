module.exports = {
	createPost: require("./createPost.js"),
	getPostById: require("./getPostById.js"),
	editPost: require("./editPost.js"),
	deletePost: require("./deletePost.js"),
	serializeSearchParams: require("./serializeSearchParams.js"),
	getManyPosts: require("./getManyPosts.js"),
	addLike: require("./addLike.js"),
	removeLike: require("./removeLike.js"),
	ensurePostAuthor: require("./ensurePostAuthor.js")
};
