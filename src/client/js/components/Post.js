import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import Linkify from "react-linkify";
import relativeTime from "dayjs/plugin/relativeTime";
import InlineSvg from "react-inlinesvg";
import {withUserContext} from "../contexts/user.context.js";
import api from "api";
import dropdownSetOpen from "../helpers/dropdownSetOpen.js";
import LoadingIndicator from "./LoadingIndicator.js";
import UserLink from "./UserLink.js";
import Dropdown from "./Dropdown.js";
import Avatar from "./Avatar.js";
dayjs.extend(relativeTime);

/*
	Renders a single post.
	
	The actual post object should be managed by the parent component
	(such as a list of multiple posts) and a single post object should
	be passed into this component to render it.

	Requires a prop `post` that holds a single post object.

	An optional `updatePost` function prop can provided that takes
	the newly updated post object as its first parameter.

	An optional `removePost` function prop can be provided that takes
	the removed post object as its first paramter.
*/
class Post extends React.Component {
	state = {
		imageExpanded: this.props.preExpand || false,
		dropdownOpen: false,
		loading: false
	}

	dropdownSetOpen = dropdownSetOpen.bind(this);

	handleLikeClick = () => {
		if (!this.props.UserContext.user) {
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
		this.setState({
			loading: true
		});

		const {post, updatePost} = this.props;

		// Send POST request to like post
		const {data} = await api.post(`/post/${post._id}/like`);

		if (data.success) {
			const newPost = {...post};

			newPost.isLiked = true;
			newPost.totalLikes++;

			updatePost && updatePost(newPost);
		}

		this.setState({
			loading: false
		});
	}

	removeLike = async () => {
		this.setState({
			loading: true
		});

		const {post, updatePost} = this.props;
		let didLike = true;

		// Send DELETE request to unlike post
		const {data} = await api.delete(`/post/${post._id}/like`);

		// Set to 'unliked' regardless of if a post was found or not
		if (data.success) {
			const newPost = {...post};

			newPost.isLiked = false;

			// If a like existed and was deleted decrement like counts
			if (data.foundLike) {
				newPost.totalLikes--;
			}

			updatePost && updatePost(newPost);
		}

		this.setState({
			loading: false
		});
	}

	handleDeleteClick = async () => {
		const {post, removePost, UserContext: {user}} = this.props;

		if (!user) {
			alert("You need to be logged in to do that.");
			return;
		}
		if (user._id !== post.author._id && !user.isAdmin) {
			alert("You cannot delete a post you do not own!");
			return;
		}

		this.setState({
			loading: true
		});

		this.dropdownSetOpen(false)();
		
		const {data} = await api.delete(`/post/${post._id}`);

		if (data.success) {
			removePost && removePost(post);
		}

		this.setState({
			loading: false
		});
	}

	render() {
		const {post, UserContext: {user: loggedUser}} = this.props;
		const user = loggedUser || {};

		if (!post) {
			return null;
		}

		const {author} = post;
		const ownsPost = author._id === user._id;
		const canModerate = !ownsPost && user.isAdmin;

		let image = null;
		if (post.image) {
			const {imageExpanded: exp} = this.state;

			image = (
				<div
					className={`post__image-container${exp ? " post__image-container--expanded" : ""}`}
					onClick={() => {this.setState({imageExpanded: !exp})}}
				>
					<img
						className="post__image"
						src={post.image.url}
						alt={`${author.nick}'s Post Image`}
					/>
					<a
						className="post__open-image"
						href={post.image.url}
						target="_blank"
						title="Open image in a new tab"
					>
						<InlineSvg
							className="svg post__open-image-icon"
							src="/images/icons/external-link-solid.svg"
							cacheGetRequests
						/>
					</a>
				</div>
			);
		}

		return (
			<div className={"post"}>
				<div className="post__section">
					<Avatar user={author} />
				</div>
				<div className="post__section">
					<div className="post__info">
						<span className="post__author">
							<span className="post__author-nick">
								<Link to={`/${author.name}`}>
									{author.nick}
								</Link>
							</span>
							<span className="post__author-name">
								<Link to={`/${author.name}`}>
									@{author.name}
								</Link>
							</span>
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
							user &&
							<span className="post__menu">
								<div
									className="post__menu-icon-container"
									onClick={this.dropdownSetOpen(true)}
								>
									<InlineSvg
										className="svg post__menu-icon"
										src="/images/icons/menu-ellipsis.svg"
										cacheGetRequests
									/>
								</div>
								<Dropdown
									isOpen={this.state.dropdownOpen}
									close={this.dropdownSetOpen(false)}
								>
									<p className="post__menu-id">{post.shortId}</p>
									<hr className="divider" />
									<Link
										className="dropdown__link"
										to={`/${author.name}/${post.shortId}`}
									>Share Post</Link>
									{
										(ownsPost || canModerate) &&
										<button
											className="dropdown__link"
											onClick={this.handleDeleteClick}
										>{ownsPost ? "Delete Post" : "Delete as Admin"}</button>
									}
								</Dropdown>
							</span>
						}
					</div>
					<div className="post__content">
						<p className="post__text">
							<Linkify componentDecorator={UserLink}>
								{post.text}
							</Linkify>
						</p>
						{image}
					</div>
					<div className="post__toolbar">
						<div
							className="post__button post__button-like"
							onClick={this.handleLikeClick}
						>
							<InlineSvg
								className="svg post__button-icon"
								src={`/images/icons/heart-${post.isLiked ? "solid" : "regular"}.svg`}
								cacheGetRequests
							/>
							<span className="post__button-number">{post.totalLikes || "0"}</span>
						</div>
					</div>
				</div>
				{this.state.loading && <LoadingIndicator className="post__loading" />}
			</div>
		);
	}
}

export default withUserContext(Post);
