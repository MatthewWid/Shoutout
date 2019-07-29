import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import api from "api";
import ErrorsList from "./ErrorsList.js";
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
		...defaultState,
		errors: []
	}

	handleChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		});
	}

	handleSubmit = async (evt) => {
		const {nick, username, email, password} = this.state;
		const {completedAction} = this.props;
		evt.preventDefault();

		const {data} = await api.post("/user", {
			nick,
			username,
			email,
			password
		});

		if (data.success) {
			completedAction && completedAction();
			await asyncWait(DROP_ANIM_TIME);

			this.props.UserContext.setUser(data.user);
		} else {
			if (data.errors) {
				const errors = data.errors.map((error) => error.msg);

				this.setState({
					errors
				});
			}
			this.setState({
				password: ""
			});
		}
	}

	render() {
		return (
			<form
				className="signup-form"
				onSubmit={this.handleSubmit}
			>
				<p>Create an account</p>
				<input
					className="input-text signup-form__nick"
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
						className="input-text signup-form__username"
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
					className="input-text signup-form__email"
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
					className="input-text signup-form__password"
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
				<ErrorsList errors={this.state.errors} />
			</form>
		);
	}
}

export default withUserContext(SignupForm);
