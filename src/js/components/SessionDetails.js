import React from "react";

class SessionDetails extends React.Component {
	state = {
		formOpen: false
	}

	toggleForm = () => {
		this.setState({
			formOpen: !this.state.formOpen
		});
	}

	render() {
		return (
			<div className="session">
				<p className="session__login-link" onClick={this.toggleForm}>
					Have an account? <b>Log in</b>
				</p>
				<div className="session_login-dropdown"></div>
			</div>
		);
	}
}

export default SessionDetails;
