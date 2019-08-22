import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import api from "api";
import {POSTS_PER_PAGE} from "constants";
import FormPost from "./FormPost.js";
import PostList from "./PostList.js";
import LoadingIndicator from "./LoadingIndicator.js";

/*
	Panel that fetches a list of posts given a set of options and renders
	the list of posts and an optional post submission form.

	By default will fetch a list of all posts sorted by newest to oldest.

	An optional `query` object prop can be passed to attach query parameters
	to the API URL.

	An optional `param` string prop can be passed to append a URL parameter
	to the API URL.
		Eg, `param` = "top" => GET `/posts/top`.

	An optional `withForm` boolean prop can be passed that dictates whether
	the form to create a new post should appear at the top of the component
	before the post list.
*/
class PanelFeed extends React.Component {
	state = {
		posts: [],
		page: 0,
		canMore: false,
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
			bump the page number by one (1) and fetch new posts, appending
			newly fetched posts to the end of the current list.

			Else, clear the existing posts and fetch from the same page.
		*/
		this.setState({
			posts: isMore ? this.state.posts : [],
			page: isMore ? ++this.state.page : this.state.page
		}, async () => {
			// Optional query parameters
			const {query: queryObj = {}} = this.props;
			queryObj.page = this.state.page;

			// Optional URL parameters. Eg, append `/top` to `/posts` => `/posts/top`
			const {param} = this.props;
			const paramStr = param ? `/${param}` : "";

			const {data} = await api.get(`/posts${paramStr}`, {
				params: {...queryObj}
			});

			if (data.success) {
				const totalPosts = this.state.posts.length + data.posts.length;

				// If no posts were retrieved after requesting new posts
				// then hide the 'Load More' button as there are no more posts
				if (data.posts.length === 0) {
					this.setState({
						canMore: false
					});
				// Else if posts were retrieved check that they are a multiple of the
				// maximum posts per page implying there are potentially more posts
				// past the visible page
				} else if (totalPosts !== 0 && totalPosts % POSTS_PER_PAGE === 0) {
					this.setState({
						canMore: true
					});
				}

				this.addPosts(data.posts, !isMore);
			}

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

	// Update a single Post in state
	updatePost = (newPost = {}) => {
		const posts = [...this.state.posts];

		// Increment post like count and set like indiciator
		posts[posts.findIndex((post) => post._id === newPost._id)] = newPost;

		this.setState({
			posts
		});
	}

	// Remove a single Post from state
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

		// If the user is logged in and the parent component allow
		// rendering of the form to create a new post
		let form = null;
		if (this.props.UserContext.user && this.props.withForm !== false) {
			form = <FormPost addPosts={this.addPosts} />;
		}

		// Click to load more button
		// Only render if the amount of loaded posts is a multiple of
		// the maximum posts per page, implying more posts could be available
		let more = null;
		if (this.state.canMore) {
			more = (
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
				{more}
			</main>
		);
	}
}

export default withUserContext(PanelFeed);
