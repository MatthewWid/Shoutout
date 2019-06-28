import React from "react";
import LoginForm from "./LoginForm.js";

class SessionDetails extends React.Component {
	state = {
		formOpen: false
	}

	toggleForm = () => {
		const formOpen = !this.state.formOpen;

		this.setState({
			formOpen
		});
	}

	render() {
		return (
			<div className="session">
				<p className="session__login-link" onClick={this.toggleForm}>
					Have an account? <b>Log in</b>
				</p>
				<div className={`session__dropdown ${this.state.formOpen ? "session__dropdown--open" : ""}`}>
					<LoginForm />
				</div>
			</div>
		);
	}
}

export default SessionDetails;
