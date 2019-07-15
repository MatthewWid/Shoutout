import React, {Fragment} from "react";
import axios from "axios";
import UserContext from "../contexts/user.context.js";
import Header from "../components/Header.js";
import UserPanel from "../components/UserPanel.js";
import FeedPanel from "../components/FeedPanel.js";
import SiteInfoPanel from "../components/SiteInfoPanel.js";

class Home extends React.Component {
	static contextType = UserContext;

	state = {
		posts: []
	}

	componentDidMount() {
		this.refresh();
	}

	refresh = () => {
		this.auth();
		this.getAllPosts();
	}

	// Authenticate if the user is logged in or not (using a cookie) on page load
	auth = async () => {
		const {data} = await axios.get("/api/user/auth", {withCredentials: true});

		this.context.setUser(data.user);
	}

	// Create a new user and log them in
	signup = async ({nick, username, email, password}) => {
		const {data: {user}} = await axios.post("/api/user", {
			nick,
			username,
			email,
			password
		}, {withCredentials: true});

		this.refresh();
	}

	// Log in existing user
	login = async ({email, password}) => {
		const {data: {user}} = await axios.post("/api/user/login", {
			email,
			password
		}, {withCredentials: true});

		this.refresh();
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

	// Send a new Post to the server
	postMessage = async ({text}) => {
		const {data} = await axios.post("/api/post", {text});

		this.addPosts([data.post]);
	}

	// Add an array of Posts to state
	addPosts = (newPosts = []) => {
		const posts = [...this.state.posts];
		posts.unshift(...newPosts);
		this.setState({
			posts
		});
	}

	// Add a single like to a post
	addLike = async (postId) => {
		let didLike = true;

		// Send POST request to like post
		await axios.post(`/api/post/${postId}/like`, {withCredentials: true})
		.then(({data: {success}}) => {
			didLike = success ? true : false;
		})
		.catch((err) => {
			didLike = false;
		});

		// If the attempt like the post failed abort the function
		if (!didLike) {
			return;
		}

		// Update state
		const posts = [...this.state.posts];

		// Increment post like count and set like indicator
		const updatedPost = posts[posts.findIndex((post) => post._id === postId)];
		updatedPost.isLiked = didLike;
		updatedPost.totalLikes++;

		this.setState({
			posts
		});
	}

	// Remove a single like from a post
	removeLike = async (postId) => {
		const {data} = await axios.delete(`/api/post/${postId}/like`, {withCredentials: true});

		// Update state
		const posts = [...this.state.posts];

		const updatedPost = posts[posts.findIndex((post) => post._id === postId)];
		// Set to 'unliked' regardless of if a post was found or not
		if (data.success) {
			updatedPost.isLiked = false;
		}
		// If a like existed and was deleted decrement like counts
		if (data.foundLike) {
			updatedPost.totalLikes--;
		}

		this.setState({
			posts
		});
	}

	render() {
		return (
			<div className="content-container">
				<div className="content">
					<UserPanel />
					<FeedPanel
						user={this.state.user}
						posts={this.state.posts}
						postMessage={this.postMessage}
						addLike={this.addLike}
						removeLike={this.removeLike}
					/>
					<SiteInfoPanel />
				</div>
			</div>
		);
	}
}

export default Home;
