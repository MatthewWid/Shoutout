import React, {Fragment} from "react";
import axios from "axios";
import dropdownSetOpen from "../helpers/dropdownSetOpen.js";
import {withUserContext} from "../contexts/user.context.js";
import Avatar from "./Avatar.js";
import Dropdown from "./Dropdown.js";
import UserEntry from "./UserEntry.js";
import asyncWait from "../helpers/asyncWait.js";
import {DROP_ANIM_TIME} from "../constants.js";

class SessionDetails extends React.Component {
	state = {
		dropdownOpen: false
	}

	dropdownSetOpen = dropdownSetOpen.bind(this);

	// Log out the existing user
	logout = async () => {
		this.dropdownSetOpen(false)();
		await asyncWait(DROP_ANIM_TIME);

		const {data} = await axios.post("/api/user/logout");

		if (data.success) {
			this.props.UserContext.setUser(null);
		}
	}

	render() {
		const {UserContext: {user}} = this.props;
		let details;
		if (user) {
			details = (
				<Fragment>
					<Avatar
						user={user}
						withLink={false}
						onClick={this.dropdownSetOpen(true)}
					/>
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
						<UserEntry completedAction={this.dropdownSetOpen(false)} />
					</Dropdown>
				</Fragment>
			);
		}

		return (
			<div className={`session ${user ? "session--logged-in" : "session--logged-out"}`}>
				{details}
			</div>
		);
	}
}

export default withUserContext(SessionDetails);
