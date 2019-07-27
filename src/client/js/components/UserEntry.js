import React from "react";
import FormLogin from "./FormLogin.js";
import FormSignup from "./FormSignup.js";

/*
	Login and Signup form - how the user "enters" the site
	with an account.

	Takes an optional `completedAction` function prop that is called
	once the user successfully logs in or signs up.
*/
class UserEntry extends React.Component {
	state = {
		login: true
	}

	toggleForm = () => {
		const login = !this.state.login;

		this.setState({
			login
		});
	}

	render() {
		let form, prompt;
		if (this.state.login) {
			form = <FormLogin completedAction={this.props.completedAction} />
			prompt = <p className="user-entry__prompt" onClick={this.toggleForm}>New to the site? <b>Sign Up</b></p>;
		} else {
			form = <FormSignup completedAction={this.props.completedAction} />
			prompt = <p className="user-entry__prompt" onClick={this.toggleForm}>Already have an account? <b>Log In</b></p>;
		}

		return (
			<div className="user-entry">
				{form}
				<hr className="divider" />
				{prompt}
			</div>
		);
	}
}

export default UserEntry;
