import React from "react";
import PostForm from "./PostForm.js";
import PostList from "./PostList.js";

class FeedPanel extends React.Component {
	render() {
		return (
			<main className="content__panel feed">
				<PostForm postMessage={this.props.postMessage} />
				<PostList posts={this.props.posts} />
			</main>
		);
	}
}

export default FeedPanel;
