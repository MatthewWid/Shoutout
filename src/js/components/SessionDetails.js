import React, {Fragment} from "react";
import UserEntry from "./UserEntry.js";

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
		let details;
		if (this.props.user) {
			details = <p>Now logged in</p>;
		} else {
			details = (
				<Fragment>
					<p className="session__login-link" onClick={this.toggleForm}>
						Have an account? <b>Log in</b>
					</p>
					<div className={`session__dropdown ${this.state.formOpen ? "session__dropdown--open" : ""}`}>
						<UserEntry
							login={this.props.login}
							signup={this.props.signup}
						/>
					</div>
				</Fragment>
			);
		}

		return (
			<div className="session">
				{details}
			</div>
		);
	}
}

export default SessionDetails;
