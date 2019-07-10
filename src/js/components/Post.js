import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import InlineSvg from "react-inlinesvg";
import Avatar from "./Avatar.js";
dayjs.extend(relativeTime);

class Post extends React.Component {
	render() {
		const {post} = this.props;
		const {author} = post;

		return (
			<div className="post">
				<div className="post__section">
					<Avatar user={author} />
				</div>
				<div className="post__section">
					<div className="post__info">
						<span className="post__author-nick">
							{author.nick}
						</span>
						<span className="post__author-name">
							@{author.name}
						</span>
						<span className="post__spacer">
							&middot;
						</span>
						<span
							className="post__age"
							title={dayjs(post.created).format("dddd DD/MM/YYYY hh:mm:ss")}
						>
							{dayjs(post.created).fromNow()}
						</span>
					</div>
					<div className="post__content">
						<p className="post__text">{post.text}</p>
					</div>
					<div className="post__toolbar">
						<div className="post__button post__button-like">
							<InlineSvg className="post__button-icon" src="./images/icons/heart.svg" cacheGetRequests></InlineSvg>
							<span className="post__button-number">{post.likes}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Post;
