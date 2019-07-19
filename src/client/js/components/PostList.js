import React from "react";
import Post from "./Post.js";

const PostList = (props) => (
	<div className="post-list">
		{
			(props.posts && props.posts.length !== 0) &&

			props.posts.map((post, index) => (
				<Post
					key={index}
					post={post}
					updatePost={props.updatePost}
					removePost={props.removePost}
				/>
			)) ||

			<p className="post-list__empty">There are no posts here, yet.</p>
		}
	</div>
);

export default PostList;
