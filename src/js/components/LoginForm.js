import React from "react";
import axios from "axios";
import UserContext from "../contexts/user.context.js";

const defaultState = {
	email: "",
	password: ""
};

class LoginForm extends React.Component {
	static contextType = UserContext;

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

		this.loginUser({
			email: this.state.email,
			password: this.state.password
		});
	}

	loginUser = async ({email, password}) => {
		const {data: {user}} = await axios.post("/api/user/login", {
			email,
			password
		}, {withCredentials: true});

		this.context.setUser(user);
	}

	render() {
		return (
			<form
				className="login-form"
				onSubmit={this.handleSubmit}
			>
				<p>Log in to your account</p>
				<input
					className="user-entry__input login-form__email"
					type="text"
					name="email"
					required
					placeholder="Email"
					value={this.state.email}
					onChange={this.handleChange}
				/>
				<input
					className="user-entry__input login-form__password"
					type="password"
					name="password"
					required
					placeholder="Password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
				<input
					className="user-entry__submit button button--primary"
					type="submit"
					value="Log In"
				/>
			</form>
		);
	}
}

export default LoginForm;
