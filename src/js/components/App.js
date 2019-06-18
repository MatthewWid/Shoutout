import React, {Fragment} from "react";
import axios from "axios";
import Header from "./Header.js";
import UserPanel from "./UserPanel.js";
import PostFeed from "./PostFeed.js";
import SiteInfo from "./SiteInfo.js";

class App extends React.Component {
	state = {
		posts: []
	};

	addPost = (post) => {
		const posts = [...this.state.posts];

		posts.push(post);

		this.setState({
			posts
		});
	}

	postMessage = ({text}) => {
		axios.post("/api/post", {
			text
		})
			.then((res) => {
				this.addPost(res.data);
			});
	};

	render() {
		return (
			<Fragment>
				<Header />
				<div className="content">
					<div className="content__inner">
						<UserPanel />
						<PostFeed
							posts={this.state.posts}
							postMessage={this.postMessage}
						/>
						<SiteInfo />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default App;
