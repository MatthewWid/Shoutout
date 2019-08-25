import React, {useEffect, useState} from "react";
import api from "api";
import Post from "./Post.js";

const PanelPost = (props) => {
	const [post, setPost] = useState(null);

	async function getPost() {
		const {data} = await api.get("/posts", {
			params: {
				shortId: props.postId
			}
		});

		if (data.success && data.posts.length !== 0) {
			setPost(data.posts[0]);
		}
	}

	// Redirect to homepage when post is deleted
	function removePost() {
		props.redirect && props.redirect("/");
	}

	useEffect(() => {
		getPost();
	}, []);

	return (
		<main className="content__panel card panel-post">
			<Post
				post={post}
				updatePost={setPost}
				removePost={removePost}
				preExpand={true}
			/>
		</main>
	);
};

export default PanelPost;
