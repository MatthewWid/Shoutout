import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import api from "api";
import asyncWait from "../helpers/asyncWait.js";
import {DROP_ANIM_TIME} from "constants";

const defaultState = {
	nick: "",
	username: "",
	email: "",
	password: ""
};

// Takes an optional `completedAction` function prop that is called
// once the user successfully signs up and logs in
class SignupForm extends React.Component {
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

		const {data: {user}} = await api.post("/user", {
			nick: this.state.nick,
			username: this.state.username,
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
				className="signup-form"
				onSubmit={this.handleSubmit}
			>
				<p>Create an account</p>
				<input
					className="user-entry__input signup-form__nick"
					type="text"
					name="nick"
					placeholder="Nickname (Optional)"
					autoCorrect="off"
					autoCapitalize="none"
					value={this.state.nick}
					onChange={this.handleChange}
				/>
				<div className="signup-form__username-container">
					<input
						className="user-entry__input signup-form__username"
						type="text"
						name="username"
						required
						placeholder="Username"
						autoCorrect="off"
						autoCapitalize="none"
						value={this.state.username}
						onChange={this.handleChange}
					/>
				</div>
				<input
					className="user-entry__input signup-form__email"
					type="text"
					name="email"
					required
					placeholder="Email Address"
					autoCorrect="off"
					autoCapitalize="none"
					value={this.state.email}
					onChange={this.handleChange}
				/>
				<input
					className="user-entry__input signup-form__password"
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
					value="Sign Up"
				/>
			</form>
		);
	}
}

export default withUserContext(SignupForm);
