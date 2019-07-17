import React from "react";
import Post from "./Post.js";

const PostList = (props) => (
	<div className="post-list">
		{props.posts.map((post, index) => (
			<Post
				key={index}
				post={post}
				updatePost={props.updatePost}
				removePost={props.removePost}
			/>
		))}
	</div>
);

export default PostList;
