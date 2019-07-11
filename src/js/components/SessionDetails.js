import React, {Fragment} from "react";
import Avatar from "./Avatar.js";
import Dropdown from "./Dropdown.js";
import UserEntry from "./UserEntry.js";

class SessionDetails extends React.Component {
	state = {
		dropdownOpen: false
	}

	dropdownAction = (change) => {
		const action = change;

		return () => {
			this.setState({
				dropdownOpen: action
			});
		};
	}

	// Trigger a method and close the form
	finalAction = (func) => {
		const action = func;

		return (...args) => {
			this.setState({
				dropdownOpen: false
			});

			action(...args);
		};
	}

	render() {
		let details;
		if (this.props.user) {
			details = (
				<Fragment>
					<Avatar user={this.props.user} onClick={this.dropdownAction(true)} />
					<Dropdown
						isOpen={this.state.dropdownOpen}
						close={this.dropdownAction(false)}
					>
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
					<p className="session__login-link" onClick={this.dropdownAction(true)}>
						Have an account? <b>Log in</b>
					</p>
					<Dropdown
						isOpen={this.state.dropdownOpen}
						close={this.dropdownAction(false)}
					>
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
