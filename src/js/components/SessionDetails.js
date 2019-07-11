import React, {Fragment} from "react";
import dropdownSetOpen from "../helpers/dropdownSetOpen.js";
import Avatar from "./Avatar.js";
import Dropdown from "./Dropdown.js";
import UserEntry from "./UserEntry.js";

class SessionDetails extends React.Component {
	state = {
		dropdownOpen: false
	}

	dropdownSetOpen = dropdownSetOpen.bind(this);

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
					<Avatar user={this.props.user} onClick={this.dropdownSetOpen(true)} />
					<Dropdown
						isOpen={this.state.dropdownOpen}
						close={this.dropdownSetOpen(false)}
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
					<p className="session__login-link" onClick={this.dropdownSetOpen(true)}>
						Have an account? <b>Log in</b>
					</p>
					<Dropdown
						isOpen={this.state.dropdownOpen}
						close={this.dropdownSetOpen(false)}
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
