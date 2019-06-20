import React, {Fragment} from "react";
import axios from "axios";
import Header from "./Header.js";
import UserPanel from "./UserPanel.js";
import FeedPanel from "./FeedPanel.js";
import SiteInfoPanel from "./SiteInfoPanel.js";

class App extends React.Component {
	state = {
		posts: []
	}

	componentDidMount() {
		this.getAllPosts();

		// // Create Account
		// axios.post("/api/user/register", {
		// 	username: "Matthew",
		// 	email: "mianamal14@gmail.com",
		// 	password: "hunter2"
		// }, {
		// 	withCredentials: true
		// })
		// 	.then((res) => {
		// 		console.log(res);
		// 	});

		// // Login
		// axios.post("/api/user/login", {
		// 	email: "mianamal14@gmail.com",
		// 	password: "hunter2"
		// }, {
		// 	withCredentials: true
		// })
		// 	.then((res) => {
		// 		console.log(res);
		// 	});
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
				<Header />
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
