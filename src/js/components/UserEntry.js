import React from "react";
import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";

class UserEntry extends React.Component {
	state = {
		login: false
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
			form = <LoginForm />
			prompt = <p className="user-entry__prompt" onClick={this.toggleForm}>New to the site? <b>Sign Up</b></p>;
		} else {
			form = <SignupForm />
			prompt = <p className="user-entry__prompt" onClick={this.toggleForm}>Already have an account? <b>Log In</b></p>;
		}

		return (
			<div className="user-entry">
				{form}
				<hr className="user-entry__divider" />
				{prompt}
			</div>
		);
	}
}

export default UserEntry;
