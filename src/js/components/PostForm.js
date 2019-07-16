import React from "react";
import axios from "axios";
import UserContext from "../contexts/user.context.js";

const defaultState = {
	text: ""
};

class PostForm extends React.Component {
	static contextType = UserContext;

	state = {
		...defaultState
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
		const {data} = await axios.post("/api/post", {text});

		if (data.success) {
			const {addPosts} = this.props;
			addPosts && addPosts([data.post]);
		}
	}

	render() {
		const charsLeft = 140 - this.state.text.length;

		return (
			<div className="post-form">
				<p className="post-form__author">Post as <b>@{this.context.user.name}</b></p>
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

export default PostForm;
