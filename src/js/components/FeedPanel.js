import React from "react";
import axios from "axios";
import UserContext from "../contexts/user.context.js";
import PostForm from "./PostForm.js";
import PostList from "./PostList.js";

class FeedPanel extends React.Component {
	static contextType = UserContext;

	state = {
		posts: []
	}

	componentDidMount() {
		this.getAllPosts();
	}

	// Retrieve array of all posts from the server
	getAllPosts = () => {
		this.setState({
			posts: []
		}, async () => {
			const {data} = await axios.get("/api/posts");
			this.addPosts(data.posts);
		});
	}

	// Add an array of Posts to state
	addPosts = (newPosts = []) => {
		const posts = [...this.state.posts];
		posts.unshift(...newPosts);
		this.setState({
			posts
		});
	}

	updatePost = (newPost = {}) => {
		const posts = [...this.state.posts];

		// Increment post like count and set like indiciator
		posts[posts.findIndex((post) => post._id === newPost._id)] = newPost;

		this.setState({
			posts
		});
	}

	render() {
		return (
			<main className="content__panel feed">
				{this.context.user && <PostForm addPosts={this.addPosts} />}
				<PostList
					posts={this.state.posts}
					updatePost={this.updatePost}
				/>
			</main>
		);
	}
}

export default FeedPanel;
