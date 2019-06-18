import React from "react";
import PostForm from "./PostForm.js";

class PostFeed extends React.Component {
	render() {
		return (
			<main className="content__panel feed">
				<PostForm postMessage={this.props.postMessage} />
			</main>
		);
	}
}

export default PostFeed;
