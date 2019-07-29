import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import api from "api";
import ErrorList from "./ErrorList.js";

const defaultState = {
	text: ""
};

/*
	Form for creating a new post.
	Handles client-side validation.

	Takes an optional `addPosts` function prop that takes
	an array of posts as its first argument.
		This can be used to add the newly made post to a rendered
		list of posts as it is submitted instead of needing the page
		to be refresh.
*/
class PostForm extends React.Component {
	state = {
		...defaultState,
		errors: []
	}

	canSubmit = () => {
		return this.state.text.length >= 1 && this.state.text.length <= 140;
	}

	handleChange = ({target}) => {
		const state = {...this.state};

		this.setState({
			[target.name]: target.value
		});
	}

	handleSubmit = (evt) => {
		evt.preventDefault();

		// If the form input is not valid, abort the submit
		if (!this.canSubmit()) {
			return;
		}

		// Send data to the server
		this.postMessage({
			text: this.state.text
		});

		// Clear form fields
		this.setState({
			...defaultState
		});
	}

	// Submit the form when pressing Enter unless simultaneously holding Shift, too
	handleKeyPress = (evt) => {
		if (evt.charCode === 13 && !evt.shiftKey) {
			this.handleSubmit(evt);
		}
	}

	// Send a new Post to the server
	postMessage = async ({text}) => {
		const {data} = await api.post("/post", {text});

		if (data.success) {
			const {addPosts} = this.props;
			addPosts && addPosts([data.post]);
		} else {
			if (data.errors) {
				const errors = data.errors.map((error) => error.msg);

				this.setState({
					errors
				});
			} else if (data.msg) {
				this.setState({
					errors: [data.msg || "Invalid input."],
				});
			}
		}
	}

	render() {
		const charsLeft = 140 - this.state.text.length;

		return (
			<div className="post-form">
				<p className="post-form__author">Post as <b>@{this.props.UserContext.user.name}</b></p>
				<form
					className="post-form__form"
					onSubmit={this.handleSubmit}
				>
					<textarea
						className="post-form__text"
						name="text"
						required
						placeholder="News, politics, cats..."
						rows="1"
						value={this.state.text}
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
					></textarea>
					<ErrorList errors={this.state.errors} />
					<div className="post-form__toolbar">
						<div className={`post-form__length ${charsLeft < 0 ? "post-form__length--disabled" : ""}`}>{charsLeft}</div>
						<input
							className="post-form__submit button button--primary"
							type="submit"
							value="Post"
							disabled={!this.canSubmit()}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default withUserContext(PostForm);
