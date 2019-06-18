import React from "react";

class Post extends React.Component {
	render() {
		const {post} = this.props;

		return <p>{post.text}</p>;
	}
}

export default Post;
