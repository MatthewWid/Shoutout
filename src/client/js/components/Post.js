import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import InlineSvg from "react-inlinesvg";
import UserContext from "../contexts/user.context.js";
import Dropdown from "./Dropdown.js";
import Avatar from "./Avatar.js";
import dropdownSetOpen from "../helpers/dropdownSetOpen.js";
dayjs.extend(relativeTime);

/*
	Heart SVGs from Font Awesome
	fontawesome.com/license/free
		fontawesome.com/icons/heart?style=regular
		fontawesome.com/icons/heart?style=solid

	Ellipsis Menu SVG from Font Awesome
		fontawesome.com/license/free
			fontawesome.com/icons/ellipsis-v?style=solid
*/

class Post extends React.Component {
	static contextType = UserContext;

	state = {
		dropdownOpen: false
	}

	dropdownSetOpen = dropdownSetOpen.bind(this);

	handleLikeClick = () => {
		if (!this.context.user) {
			alert("You need to have an account to like a post");
			return;
		}
		if (!this.props.post.isLiked) {
			this.addLike(this.props.post._id);
		} else {
			this.removeLike(this.props.post._id);
		}
	}

	addLike = async () => {
		const {post, updatePost} = this.props;
		let didLike = true;

		// Send POST request to like post
		await axios.post(`/api/post/${post._id}/like`, {withCredentials: true})
		.then(({data: {success}}) => {
			didLike = success ? true : false;
		})
		.catch((err) => {
			didLike = false;
		});

		// If the attempt like the post failed abort the function
		if (!didLike) {
			return;
		}

		const newPost = {...post};
		newPost.isLiked = didLike;
		newPost.totalLikes++;

		updatePost && updatePost(newPost);
	}

	removeLike = async () => {
		const {post, updatePost} = this.props;
		let didLike = true;

		// Send DELETE request to unlike post
		const {data} = await axios.delete(`/api/post/${post._id}/like`, {withCredentials: true});

		const newPost = {...post};
		// Set to 'unliked' regardless of if a post was found or not
		if (data.success) {
			newPost.isLiked = false;

			// If a like existed and was deleted decrement like counts
			if (data.foundLike) {
				newPost.totalLikes--;
			}
		}

		updatePost && updatePost(newPost);
	}

	handleDeleteClick = async () => {
		const {post, removePost} = this.props;

		if (!this.context.user) {
			alert("You need to be logged in to do that.");
			return;
		}
		if (this.context.user._id !== post.author._id) {
			alert("You cannot delete a post you do not own!");
			return;
		}

		const {data} = await axios.delete(`/api/post/${post._id}`, {withCredentials: true});

		if (data.success) {
			removePost && removePost(post);
			this.dropdownSetOpen(false)();
		}
	}

	render() {
		const {post} = this.props;
		const {author} = post;
		const ownsPost = author._id === this.context.user._id;

		return (
			<div className={"post"}>
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
						{
							this.context.user &&
							<span className="post__menu">
								<div
									className="post__menu-icon-container"
									onClick={this.dropdownSetOpen(true)}
								>
									<InlineSvg
										className="svg post__menu-icon"
										src={"./images/icons/menu-ellipsis.svg"}
										cacheGetRequests
									></InlineSvg>
								</div>
								<Dropdown
									isOpen={this.state.dropdownOpen}
									close={this.dropdownSetOpen(false)}
								>
									{
										ownsPost &&
										<button
											className="dropdown__link"
											onClick={this.handleDeleteClick}
										>Delete Post</button>
									}
								</Dropdown>
							</span>
						}
					</div>
					<div className="post__content">
						<p className="post__text">{post.text}</p>
					</div>
					<div className="post__toolbar">
						<div
							className="post__button post__button-like"
							onClick={this.handleLikeClick}
						>
							<InlineSvg
								className="svg post__button-icon"
								src={`./images/icons/heart-${post.isLiked ? "solid" : "regular"}.svg`}
								cacheGetRequests
							></InlineSvg>
							<span className="post__button-number">{post.totalLikes || "0"}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Post;
