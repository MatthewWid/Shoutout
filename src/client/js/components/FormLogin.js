import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import api from "api";
import asyncWait from "../helpers/asyncWait.js";
import {DROP_ANIM_TIME} from "constants";

const defaultState = {
	email: "",
	password: ""
};

// Takes an optional `completedAction` function prop that is called
// once the user successfully logs in
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

	handleSubmit = async (evt) => {
		const {completedAction} = this.props;
		evt.preventDefault();

		const {data: {user}} = await api.post("/user/login", {
			email: this.state.email,
			password: this.state.password
		});

		completedAction && completedAction();
		await asyncWait(DROP_ANIM_TIME);

		this.props.UserContext.setUser(user);
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
					autoCorrect="off"
					autoCapitalize="none"
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

export default withUserContext(LoginForm);
