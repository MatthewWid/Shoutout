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
		this.auth();
		this.getAllPosts();
	}

	// Authenticate if the user is logged in or not (using a cookie) on page load
	auth = async () => {
		const {data: {user}} = await axios.get("/api/user/auth", {withCredentials: true});

		this.setUser(user);
	}

	// Create a new user and log them in
	signup = async (username, email, password) => {
		const {data: {user}} = await	axios.post("/api/user/register", {
			username,
			email,
			password
		}, {withCredentials: true});

		this.setUser(user);
	}

	// Log in existing user
	login = async (email, password) => {
		const {data: {user}} = await axios.post("/api/user/login", {
			email,
			password
		}, {withCredentials: true});

		this.setUser(user);
	}

	// Helper to set the currently logged in user in the component state
	setUser = (user) => {
		this.setState({
			user
		});
	}

	// Retrieve array of all posts from the server
	getAllPosts = async () => {
		const {data} = await axios.get("/api/posts");

		this.addPosts(data);
	}

	// Send a new Post to the server
	postMessage = async ({text}) => {
		const {data} = await axios.post("/api/post", {text});

		this.addPosts([data]);
	}

	// Add an array of Posts to state
	addPosts = (newPosts = []) => {
		const posts = [...this.state.posts];
		posts.unshift(...newPosts);
		this.setState({
			posts
		});
	}

	render() {
		return (
			<Fragment>
				<Header user={this.state.user} />
				<div className="content-container">
					<div className="content">
						<UserPanel />
						<FeedPanel
							posts={this.state.posts}
							postMessage={this.postMessage}
						/>
						<SiteInfoPanel />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default App;
