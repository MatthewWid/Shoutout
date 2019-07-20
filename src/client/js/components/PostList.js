import React from "react";
import Post from "./Post.js";

const PostList = (props) => {
	if (props.posts && props.posts.length !== 0) {
		return (
			<div className="post-list">
				{
					props.posts.map((post, index) => (
						<Post
							key={index}
							post={post}
							updatePost={props.updatePost}
							removePost={props.removePost}
						/>
					))
				}
			</div>
		);
	} else {
		return (
			<div className="post-list">
				<p className="post-list__empty">There are no posts here, yet.</p>
			</div>
		);
	}
};

export default PostList;
