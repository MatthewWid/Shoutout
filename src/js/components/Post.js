import React from "react";
import InlineSvg from "react-inlinesvg";

class Post extends React.Component {
	render() {
		const {text, likes} = this.props.post;

		return (
			<div className="post">
				<div className="post__author"></div>
				<div className="post__content">
					<p className="post__text">{text}</p>
				</div>
				<div className="post__buttons">
					<div className="post__button post__button-like">
						<InlineSvg className="post__button-icon" src="./images/icons/heart.svg"></InlineSvg>
						<span className="post__button-number">{likes}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Post;
