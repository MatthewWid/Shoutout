import React, {Fragment} from "react";
import Avatar from "./Avatar.js";
import Dropdown from "./Dropdown.js";
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

	// Trigger a method and close the form
	finalAction = (func) => {
		const action = func;

		return (...args) => {
			this.setState({
				formOpen: false
			});

			action(...args);
		};
	}

	render() {
		let details;
		if (this.props.user) {
			details = (
				<Fragment>
					<Avatar user={this.props.user} onClick={this.toggleForm} />
					<Dropdown open={this.state.formOpen}>
						<button
							className="dropdown__link"
							onClick={this.finalAction(this.props.logout)}
						>
							Log Out
						</button>
					</Dropdown>
				</Fragment>
			);
		} else {
			details = (
				<Fragment>
					<p className="session__login-link" onClick={this.toggleForm}>
						Have an account? <b>Log in</b>
					</p>
					<Dropdown open={this.state.formOpen}>
						<UserEntry
							login={this.finalAction(this.props.login)}
							signup={this.finalAction(this.props.signup)}
						/>
					</Dropdown>
				</Fragment>
			);
		}

		return (
			<div className={`session ${this.props.user ? "session--logged-in" : "session--logged-out"}`}>
				{details}
			</div>
		);
	}
}

export default SessionDetails;
