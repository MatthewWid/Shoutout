import React from "react";
import Post from "./Post.js";

const PostList = ({posts}) => (
	<div className="post-list">
		{posts.map((post, index) => <Post key={index} post={post} />)}
	</div>
);

export default PostList;
