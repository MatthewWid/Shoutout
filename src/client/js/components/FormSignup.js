import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import api from "api";
import extractErrors from "../helpers/extractErrors.js";
import ErrorList from "./ErrorList.js";

const defaultState = {
	nick: "",
	name: "",
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
		const {nick, name, email, password} = this.state;
		const {completedAction} = this.props;
		evt.preventDefault();

		const body = {
			name,
			email,
			password
		};
		if (nick) {
			body.nick = nick;
		}

		const {data} = await api.post("/user", body);

		if (data.success) {
			completedAction && completedAction();

			this.props.UserContext.setUser(data.user);
		} else {
			this.setState({
				errors: extractErrors(data),
				password: ""
			});
		}
	}

	render() {
		return (
			<form
				className="form-signup"
				onSubmit={this.handleSubmit}
			>
				<p>Create an account</p>
				<input
					className="input-text form-signup__nick"
					type="text"
					name="nick"
					placeholder="Nickname (Optional)"
					autoCorrect="off"
					autoCapitalize="none"
					value={this.state.nick}
					onChange={this.handleChange}
				/>
				<div className="form-signup__name-container">
					<input
						className="input-text form-signup__name"
						type="text"
						name="name"
						required
						placeholder="Username"
						autoCorrect="off"
						autoCapitalize="none"
						value={this.state.name}
						onChange={this.handleChange}
					/>
				</div>
				<input
					className="input-text form-signup__email"
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
					className="input-text form-signup__password"
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
				<ErrorList errors={this.state.errors} />
			</form>
		);
	}
}

export default withUserContext(SignupForm);
