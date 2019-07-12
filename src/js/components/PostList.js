import React from "react";
import Post from "./Post.js";

const PostList = (props) => (
	<div className="post-list">
		{props.posts.map((post, index) => (
			<Post
				key={index}
				post={post}
				addLike={props.addLike}
			/>
		))}
	</div>
);

export default PostList;
