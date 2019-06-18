import React from "react";

const defaultState = {
	text: ""
};

class PostForm extends React.Component {
	state = {
		...defaultState
	};

	handleChange = ({target}) => {
		const state = {...this.state};

		this.setState({
			[target.name]: target.value
		});
	}

	handleSubmit = (evt) => {
		evt.preventDefault();

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
			<div className="feed_message-form">
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="text"
						value={this.state.text}
						onChange={this.handleChange}
					/>
					<input type="submit" value="Post" />
				</form>
			</div>
		);
	}
}

export default PostForm;
