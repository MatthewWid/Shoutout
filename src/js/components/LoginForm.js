import React from "react";

const defaultState = {
	username: "",
	password: ""
};

class LoginForm extends React.Component {
	state = {
		...defaultState
	}

	handleChange = ({target}) => {
		const state = {...this.state};

		this.setState({
			[target.name]: target.value
		});
	}

	render() {
		return (
			<form className="login-form">
				<p>Log in to your account</p>
				<input
					type="text"
					name="username"
					required
					placeholder="Email"
					value={this.state.username}
					onChange={this.handleChange}
				/>
			</form>
		);
	}
}

export default LoginForm;
