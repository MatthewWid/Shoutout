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
					className="login-form__input login-form__username"
					type="text"
					name="username"
					required
					placeholder="Email"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<input
					className="login-form__input login-form__password"
					type="password"
					name="password"
					required
					placeholder="Password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
			</form>
		);
	}
}

export default LoginForm;
