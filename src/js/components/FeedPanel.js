import React from "react";
import PostForm from "./PostForm.js";
import PostList from "./PostList.js";

const FeedPanel = (props) => {
	return (
		<main className="content__panel feed">
			{props.user && <PostForm user={props.user} postMessage={props.postMessage} />}
			<PostList posts={props.posts} />
		</main>
	);
};

export default FeedPanel;
