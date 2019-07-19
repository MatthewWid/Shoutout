import React from "react";
import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";

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
			form = <LoginForm waitCompleteAction={this.props.waitCompleteAction} />
			prompt = <p className="user-entry__prompt" onClick={this.toggleForm}>New to the site? <b>Sign Up</b></p>;
		} else {
			form = <SignupForm waitCompleteAction={this.props.waitCompleteAction} />
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
