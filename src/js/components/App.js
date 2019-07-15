import React, {Fragment} from "react";
import axios from "axios";
import Header from "./Header.js";
import UserPanel from "./UserPanel.js";
import FeedPanel from "./FeedPanel.js";
import SiteInfoPanel from "./SiteInfoPanel.js";

class App extends React.Component {
	state = {
		user: null,
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

		this.setUser(data.user);
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

	// Log out existing user
	logout = async () => {
		const {data} = await axios.post("/api/user/logout");

		if (data.success) {
			this.refresh();
		}
	}

	// Set the currently logged in user in the component state
	setUser = (user) => {
		this.setState({
			user
		});
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
			<Fragment>
				{/* Redux? */}
				<Header
					user={this.state.user}
					login={this.login}
					logout={this.logout}
					signup={this.signup}
				/>
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
			</Fragment>
		);
	}
}

export default App;
