import React, {Fragment} from "react";
import {withRouter} from "react-router-dom";
import {withUserContext} from "../contexts/user.context.js";
import Avatar from "./Avatar.js";
import Dropdown from "./Dropdown.js";
import UserLinks from "./UserLinks.js";
import UserEntry from "./UserEntry.js";

/*
	Displays the users' "session" in the header.

	If the user is logged in will display their avatar with a dropdown menu
	containing quick links to user-specific pages.

	If the user is not logged in will render the UserEntry component and
	prompt them to log in or make an account.
*/
class SessionDetails extends React.Component {
	state = {
		dropdownOpen: false
	}

	closeAndRedirect = () => {
		this.setState({
			dropdownOpen: false
		});
		this.props.history && this.props.history.push("/");
	}

	setDropdown = (action) => {
		const change = action;
		return () => {
			this.setState({
				dropdownOpen: change
			});
		};
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
						onClick={this.setDropdown(true)}
					/>
					<Dropdown
						isOpen={this.state.dropdownOpen}
						close={this.setDropdown(false)}
						key={0}
					>
						<UserLinks
							user={user}
							closeAndRedirect={this.closeAndRedirect}
						/>
					</Dropdown>
				</Fragment>
			);
		} else {
			details = (
				<Fragment>
					<p className="session__login-link" onClick={() => {this.setState({dropdownOpen: true})}}>
						Have an account? <b>Log in</b>
					</p>
					<Dropdown
						isOpen={this.state.dropdownOpen}
						close={this.setDropdown(false)}
						key={1}
					>
						<UserEntry
							completedAction={this.closeAndRedirect}
						/>
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

export default withRouter(withUserContext(SessionDetails));
