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

	auth = () => {
		axios.get("/api/user/auth", {
			withCredentials: true
		})
			.then((res) => {
				console.log(res.data);
				this.setUser(res.data.user);
				return res.data;
			});
	}

	signup = (username, email, password) => {
		axios.post("/api/user/register", {
			username,
			email,
			password
		}, {
			withCredentials: true
		})
			.then((res) => {
				this.setUser(res.data.user);
				return res.data;
			});
	}

	login = (email, password) => {
		axios.post("/api/user/login", {
			email,
			password
		}, {
			withCredentials: true
		})
			.then((res) => {
				this.setUser(res.data.user);
				return res.data;
			});
	}

	setUser = (user) => {
		this.setState({
			user
		});
	}

	// Retrieve array of all posts from the server
	getAllPosts = () => {
		axios.get("/api/posts")
			.then((res) => {
				this.addPosts(res.data);
			});
	}

	// Send a new Post to the server
	postMessage = ({text}) => {
		axios.post("/api/post", {
			text
		})
			.then((res) => {
				this.addPosts([res.data]);
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
