import React from "react";

const defaultState = {
	text: ""
};

class PostForm extends React.Component {
	state = {
		...defaultState
	}

	handleChange = ({target}) => {
		const state = {...this.state};

		this.setState({
			[target.name]: target.value
		});
	}

	handleSubmit = (evt) => {
		evt.preventDefault();

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
		return (
			<div className="feed__post-form">
				<form className="post-form" onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="text"
						placeholder="News, politics, cats..."
						value={this.state.text}
						onChange={this.handleChange}
					/>
					<div className="post-form__toolbar">
						<input type="submit" value="Post" />
					</div>
				</form>
			</div>
		);
	}
}

export default PostForm;
