import React, {Fragment} from "react";
import axios from "axios";
import dropdownSetOpen from "../helpers/dropdownSetOpen.js";
import UserContext from "../contexts/user.context.js";
import Avatar from "./Avatar.js";
import Dropdown from "./Dropdown.js";
import UserEntry from "./UserEntry.js";

class SessionDetails extends React.Component {
	static contextType = UserContext;

	state = {
		dropdownOpen: false
	}

	dropdownSetOpen = dropdownSetOpen.bind(this);

	// Log out the existing user
	logout = async () => {
		await this.dropdownSetOpen(false)();

		const {data} = await axios.post("/api/user/logout");

		if (data.success) {
			this.context.setUser(null);
		}
	}

	render() {
		let details;
		if (this.context.user) {
			details = (
				<Fragment>
					<Avatar user={this.context.user} onClick={this.dropdownSetOpen(true)} />
					<Dropdown
						isOpen={this.state.dropdownOpen}
						close={this.dropdownSetOpen(false)}
					>
						<button
							className="dropdown__link"
							onClick={this.logout}
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
						<UserEntry waitCompleteAction={this.dropdownSetOpen(false)} />
					</Dropdown>
				</Fragment>
			);
		}

		return (
			<div className={`session ${this.context.user ? "session--logged-in" : "session--logged-out"}`}>
				{details}
			</div>
		);
	}
}

export default SessionDetails;
