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
				this.addPost(res.data);
			});
	}

	// Add a single Post to state
	addPost = (newPost) => {
		const posts = [...this.state.posts];
		posts.unshift(newPost);
		this.setState({
			posts
		});
	}

	// Add an array of Posts to state
	addPosts = (newPosts) => {
		const posts = [...this.state.posts];
		posts.push(...newPosts);
		this.setState({
			posts
		});
	}

	render() {
		return (
			<Fragment>
				<Header />
				<div className="content">
					<div className="content__inner">
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
