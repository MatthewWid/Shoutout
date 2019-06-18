import React from "react";
import Post from "./Post.js";

const PostList = ({posts}) => {
	const postList = posts.map((post, index) => (
		<Post key={index} post={post} />
	));

	return postList;
};

export default PostList;
