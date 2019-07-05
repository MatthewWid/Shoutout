import React, {Fragment} from "react";
import axios from "axios";
import Header from "./Header.js";
import UserPanel from "./UserPanel.js";
import FeedPanel from "./FeedPanel.js";
import SiteInfoPanel from "./SiteInfoPanel.js";

class App extends React.Component {
	state = {
		user: null,
		posts: [],
		stats: {
			users: 0,
			posts: 0,
			likes: 0
		}
	}

	componentDidMount() {
		this.auth();
		this.getAllPosts();
		this.getSiteStats();
	}

	// Authenticate if the user is logged in or not (using a cookie) on page load
	auth = async () => {
		const {data: {user}} = await axios.get("/api/user/auth", {withCredentials: true});

		this.setUser(user);
	}

	// Create a new user and log them in
	signup = async (registrationInfo) => {
		const {nick, username, email, password} = registrationInfo;
		const {data: {user}} = await axios.post("/api/user/register", {
			nick,
			username,
			email,
			password
		}, {withCredentials: true});

		this.setUser(user);

		const {stats} = this.state;
		stats.users++;
		this.setState({
			stats
		});
	}

	// Log in existing user
	login = async (loginInfo) => {
		const {email, password} = loginInfo;
		const {data: {user}} = await axios.post("/api/user/login", {
			email,
			password
		}, {withCredentials: true});

		this.setUser(user);
	}

	// Set the currently logged in user in the component state
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

		const {stats} = this.state;
		stats.posts++;
		this.setState({
			stats
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

	// Get website statistics (total posts, users and likes) and set them in state
	getSiteStats = async () => {
		const res = await axios.get("/api/stats");

		const stats = {
			...this.state.stats,
			...res.data
		};

		this.setState({
			stats
		});
	}

	render() {
		return (
			<Fragment>
				{/* Redux? */}
				<Header
					user={this.state.user}
					login={this.login}
					signup={this.signup}
				/>
				<div className="content-container">
					<div className="content">
						<UserPanel />
						<FeedPanel
							user={this.state.user}
							posts={this.state.posts}
							postMessage={this.postMessage}
						/>
						<SiteInfoPanel stats={this.state.stats} />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default App;
