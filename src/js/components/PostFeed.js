import React from "react";

class PostFeed extends React.Component {
	render() {
		return (
			<main className="content__panel feed">
				<p>Post Feed</p>
				<p>{this.props.text}</p>
			</main>
		);
	}
}

export default PostFeed;
