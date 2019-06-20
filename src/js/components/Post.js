import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import InlineSvg from "react-inlinesvg";
dayjs.extend(relativeTime);

class Post extends React.Component {
	render() {
		const {post} = this.props;

		return (
			<div className="post">
				<div className="post__info">
					<div
						className="post__age"
						title={dayjs(post.created).format("dddd DD/MM/YYYY ss:mm:hh")}
					>
						{dayjs(post.created).fromNow()}
					</div>
				</div>
				<div className="post__content">
					<p className="post__text">{post.text}</p>
				</div>
				<div className="post__toolbar">
					<div className="post__button post__button-like">
						<InlineSvg className="post__button-icon" src="./images/icons/heart.svg"></InlineSvg>
						<span className="post__button-number">{post.likes}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Post;
