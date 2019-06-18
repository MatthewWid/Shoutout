import React from "react";

class MessageForm extends React.Component {
	state = {
		text: ""
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

export default MessageForm;
