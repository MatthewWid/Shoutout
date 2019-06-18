import React from "react";
import MessageForm from "./MessageForm.js";

class PostFeed extends React.Component {
	render() {
		return (
			<main className="content__panel feed">
				<MessageForm postMessage={this.props.postMessage} />
			</main>
		);
	}
}

export default PostFeed;
