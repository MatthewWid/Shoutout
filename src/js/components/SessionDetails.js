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

	render() {
		let details;
		if (this.props.user) {
			details = <Avatar user={this.props.user} />;
		} else {
			details = (
				<Fragment>
					<p className="session__login-link" onClick={this.toggleForm}>
						Have an account? <b>Log in</b>
					</p>
					<Dropdown open={this.state.formOpen}>
						<UserEntry
							login={this.props.login}
							signup={this.props.signup}
						/>
					</Dropdown>
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
