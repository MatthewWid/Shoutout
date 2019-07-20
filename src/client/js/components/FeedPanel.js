import React from "react";
import axios from "axios";
import {withUserContext} from "../contexts/user.context.js";
import PostForm from "./PostForm.js";
import PostList from "./PostList.js";
import serializeObjectToUri from "../helpers/serializeObjectToUri.js";

class FeedPanel extends React.Component {
	state = {
		posts: []
	}

	componentDidUpdate(prevProps) {
		const {UserContext: {loginStatus: prevLoginStatus}} = prevProps;
		const {UserContext: {loginStatus}} = this.props;

		// If the user logs in or out (Except logging in from the initial auth)
		// Reload all of the posts (Switching between global/personalised post feed)
		if (
			prevLoginStatus !== loginStatus &&
			(
				loginStatus === 1 ||
				loginStatus === 2
			)
		) {
			this.fetchPosts();
		}
	}

	// Retrieve array of all posts from the server
	fetchPosts = () => {
		this.setState({
			posts: []
		}, async () => {
			let request = "/api/posts";
			const {query} = this.props;

			if (query) {
				const params = serializeObjectToUri(query);
				request = `${request}?${params}`;
			}

			const {data} = await axios.get(request);
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
		let form = null;
		if (this.props.UserContext.user && this.props.hasForm !== false) {
			form = <PostForm addPosts={this.addPosts} />;
		}

		return (
			<main className="content__panel feed">
				{form}
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
