import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import api from "api";
import extractErrors from "../helpers/extractErrors.js";
import ErrorList from "./ErrorList.js";
import asyncWait from "../helpers/asyncWait.js";
import {DROP_ANIM_TIME} from "constants";

const defaultState = {
	name: "",
	password: ""
};

// Takes an optional `completedAction` function prop that is called
// once the user successfully logs in
class LoginForm extends React.Component {
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
		const {name, password} = this.state;
		const {completedAction} = this.props;
		evt.preventDefault();

		const {data} = await api.post("/user/login", {
			name,
			password
		});

		if (data.success) {
			completedAction && completedAction();
			await asyncWait(DROP_ANIM_TIME);

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
				className="form-login"
				onSubmit={this.handleSubmit}
			>
				<p>Log in to your account</p>
				<input
					className="input-text form-login__email"
					type="text"
					name="name"
					required
					placeholder="Username"
					autoCorrect="off"
					autoCapitalize="none"
					value={this.state.name}
					onChange={this.handleChange}
				/>
				<input
					className="input-text form-login__password"
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
				<ErrorList errors={this.state.errors} />
			</form>
		);
	}
}

export default withUserContext(LoginForm);
