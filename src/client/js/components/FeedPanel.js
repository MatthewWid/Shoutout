import React from "react";
import axios from "axios";
import {withUserContext} from "../contexts/user.context.js";
import PostForm from "./PostForm.js";
import PostList from "./PostList.js";

class FeedPanel extends React.Component {
	state = {
		posts: []
	}

	componentDidMount() {
		this.getAllPosts();
	}

	componentDidUpdate(prevProps) {
		const {UserContext: {loginStatus: prevLoginStatus}} = prevProps;
		const {UserContext: {loginStatus}} = this.props;

		// If the user logs in or out (Except logging in from the initial auth)
		// Reload all of the posts (Switching between global/personalised post feed)
		if (
			prevLoginStatus != loginStatus &&
			(
				loginStatus === 1 ||
				loginStatus === 2
			)
		) {
			this.getAllPosts();
		}
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

	removePost = (delPost) => {
		const posts = [...this.state.posts]
			.filter((post) => post._id !== delPost._id);
			// .splice(posts.findIndex((post) => post._id === delPost._id), 1);

		this.setState({
			posts
		});
	}

	render() {
		return (
			<main className="content__panel feed">
				{this.props.UserContext.user && <PostForm addPosts={this.addPosts} />}
				<PostList
					posts={this.state.posts}
					updatePost={this.updatePost}
					removePost={this.removePost}
				/>
			</main>
		);
	}
}

export default withUserContext(FeedPanel);
