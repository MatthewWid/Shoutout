import React from "react";
import UserContext from "../contexts/user.context.js";
import PostForm from "./PostForm.js";
import PostList from "./PostList.js";

const FeedPanel = (props) => {
	const context = React.useContext(UserContext);

	return (
		<main className="content__panel feed">
			{context.user && <PostForm postMessage={props.postMessage} />}
			<PostList
				posts={props.posts}
				addLike={props.addLike}
				removeLike={props.removeLike}
			/>
		</main>
	);
};

export default FeedPanel;
