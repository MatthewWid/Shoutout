import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import api from "api";
import {POSTS_PER_PAGE} from "constants";
import FormPost from "./FormPost.js";
import PostList from "./PostList.js";
import LoadingIndicator from "./LoadingIndicator.js";
import serializeObjectToUri from "../helpers/serializeObjectToUri.js";

/*
	Panel that renders a feed of posts.

	By default will fetch a list of all posts sorted by newest to oldest.
	An optional `query` object prop can be passed to attach query parameters
	to the API URL.
*/
class PanelFeed extends React.Component {
	state = {
		posts: [],
		page: 0,
		loading: true
	}

	componentDidMount() {
		// Fetch posts if the route changes after the initial page load
		if (this.props.UserContext.loginStatus === 0) {
			return;
		}

		this.fetchPosts();
	}

	componentDidUpdate(prevProps) {
		const {UserContext: {loginStatus: prevLoginStatus}} = prevProps;
		const {UserContext: {loginStatus}} = this.props;

		// If the user logs in or out (Except logging in from the initial auth)
		// Reload all of the posts (Switching between global/personalised post feed)
		if (
			prevLoginStatus !== loginStatus &&
			(loginStatus === 1 || loginStatus === 2)
		) {
			this.fetchPosts();
		}
	}

	// Retrieve an array of posts
	fetchPosts = (isMore = false) => {
		/*
			If fetching posts for a new page preserve the existing posts,
			bump the page number one (1) and fetch new posts, appending
			newly fetched posts to the end of the current list.

			Else, clear the existing posts and fetch from the same page.
		*/
		this.setState({
			posts: isMore ? this.state.posts : [],
			page: isMore ? ++this.state.page : this.state.page
		}, async () => {
			// Optional query parameters
			const {query: queryObj = {}} = this.props.query;
			queryObj.page = this.state.page;
			const queryStr = serializeObjectToUri(queryObj);

			// Optional URL parameters. Eg, append `/top` to `/posts` => `/posts/top`
			const {param} = this.props;
			const paramStr = param ? `/${param}` : "";

			// Construct request URL
			const request = `/posts${paramStr}?${queryStr}`;

			const {data} = await api.get(request);

			this.addPosts(data.posts, !isMore);
			this.setState({
				loading: false
			});
		});
	}

	// Add an array of Posts to state
	addPosts = (newPosts = [], prepend = true) => {
		const posts = [...this.state.posts];
		if (prepend) {
			posts.unshift(...newPosts);
		} else {
			posts.push(...newPosts);
		}
		this.setState({
			posts
		});
	}

	updatePost = (newPost = {}) => {
		const posts = [...this.state.posts];

		// Increment post like count and set like indiciator
		posts[posts.findIndex((post) => post._id === newPost._id)] = newPost;

		this.setState({
			posts
		});
	}

	removePost = (delPost) => {
		const posts = [...this.state.posts]
			.filter((post) => post._id !== delPost._id);
			// .splice(posts.findIndex((post) => post._id === delPost._id), 1);

		this.setState({
			posts
		});
	}

	render() {
		if (this.state.loading && this.state.posts.length === 0) {
			return <LoadingIndicator className="content__panel card" />;
		}

		let form = null;
		// If the user is logged in and the parent component allows it
		// render the form to create a new post
		if (this.props.UserContext.user && this.props.hasForm !== false) {
			form = <FormPost addPosts={this.addPosts} />;
		}

		// Click to load more button
		// Only render if the amount of loaded posts is a multiple of
		// the maximum posts per page, implying more posts could be available.
		const loadedPosts = this.state.posts.length;
		let buttonMore = null;
		if (loadedPosts !== 0 && loadedPosts % POSTS_PER_PAGE === 0) {
			buttonMore = (
				<button
					className="panel-feed__more"
					onClick={() => {this.fetchPosts(true)}}
				>Load More</button>
			);
		}

		return (
			<main className="content__panel card panel-feed">
				{form}
				<PostList
					posts={this.state.posts}
					updatePost={this.updatePost}
					removePost={this.removePost}
				/>
				{buttonMore}
			</main>
		);
	}
}

export default withUserContext(PanelFeed);
