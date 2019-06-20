import React from "react";

const defaultState = {
	text: ""
};

class PostForm extends React.Component {
	state = {
		...defaultState
	}

	canSubmit = () => {
		return this.state.text.length > 2 && this.state.text.length <= 140;
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
		const {text} = this.state;
		this.props.postMessage({
			text
		});

		// Clear form fields
		this.setState({
			...defaultState
		});
	}

	render() {
		const charsLeft = 140 - this.state.text.length;

		return (
			<div className="feed__post-form">
				<form className="post-form" onSubmit={this.handleSubmit}>
					<textarea
						type="text"
						name="text"
						required
						placeholder="News, politics, cats..."
						rows="1"
						value={this.state.text}
						onChange={this.handleChange}
					></textarea>
					<div className="post-form-toolbar">
						<div className={`post-form-toolbar__length ${charsLeft < 0 ? "post-form-toolbar__length--disabled" : ""}`}>{charsLeft}</div>
						<div className="post-form-toolbar__submit">
							<input type="submit" value="Post" disabled={!this.canSubmit()} />
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default PostForm;
