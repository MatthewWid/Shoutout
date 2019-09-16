import React from "react";
import InlineSvg from "react-inlinesvg";
import {withUserContext} from "../contexts/user.context.js";
import api from "api";
import handleFileChange from "../helpers/handleFileChange.js";
import extractErrors from "../helpers/extractErrors.js";
import LoadingIndicator from "./LoadingIndicator.js";
import ErrorList from "./ErrorList.js";

const defaultState = {
	text: "",
	image: ""
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
class FormPost extends React.Component {
	state = {
		...defaultState,
		errors: [],
		loading: false
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
		this.submitPost();
	}

	// Submit the form when pressing Enter unless simultaneously holding Shift, too
	handleKeyPress = (evt) => {
		if (evt.charCode === 13 && !evt.shiftKey) {
			this.handleSubmit(evt);
		}
	}

	handleFileChange = handleFileChange.bind(this)

	// Send a new Post to the server
	submitPost = async () => {
		this.setState({
			loading: true
		});

		const {text, image} = this.state;

		const body = {
			text
		};
		if (image) {
			body.image = image;
		}

		const {data} = await api.post("/post", body);

		if (data.success) {
			// Clear form fields
			this.setState({
				...defaultState,
				errors: []
			});

			const {addPosts} = this.props;
			addPosts && addPosts([data.post]);
		} else {
			this.setState({errors: extractErrors(data)});
		}

		this.setState({
			loading: false
		});
	}

	render() {
		const charsLeft = 140 - this.state.text.length;

		return (
			<div className="form-post">
				<p className="form-post__author">Post as <b>@{this.props.UserContext.user.name}</b></p>
				<form
					className="form-post__form"
					onSubmit={this.handleSubmit}
				>
					<textarea
						className="form-post__text"
						name="text"
						required
						placeholder="News, politics, cats..."
						rows="1"
						value={this.state.text}
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
					></textarea>
					<ErrorList errors={this.state.errors} />
					<div className="form-post__toolbar">
						<div className="form-post__toolbar-section">
							<label className="input-label">
								<InlineSvg
									className="svg form-post__icon"
									src="/images/icons/file-image.svg"
									cacheGetRequests
								/>
								<input
									className="form-post__image-upload"
									type="file"
									name="image"
									onChange={this.handleFileChange}
								/>
							</label>
						</div>
						<div className="form-post__toolbar-section">
							<div className={`form-post__length ${charsLeft < 0 ? "form-post__length--disabled" : ""}`}>{charsLeft}</div>
							<input
								className="form-post__submit button button--primary"
								type="submit"
								value="Post"
								disabled={!this.canSubmit()}
							/>
						</div>
					</div>
					{
						this.state.image &&
						<div className="form-post__preview">
							<div className="form-post__image-container">
								<img
									className="form-post__image"
									src={this.state.image}
									alt="Preview of Image to Upload"
								/>
								<button
									className="form-post__image-remove"
									onClick={() => {this.setState({image: ""})}}
									title="Remove image from post"
								>&#10060;</button>
							</div>
						</div>
					}
				</form>
				{this.state.loading && <LoadingIndicator className="form-post__loading" />}
			</div>
		);
	}
}

export default withUserContext(FormPost);
