import React from "react";
import axios from "axios";
import {withUserContext} from "../contexts/user.context.js";
import asyncWait from "../helpers/asyncWait.js";
import {DROP_ANIM_TIME} from "../constants.js";

// Takes an optional `completedAction` function prop that is called
// once the user successfully logs out
class LogoutForm extends React.Component {
	// Log out the existing user
	handleSubmit = async () => {
		const {completedAction} = this.props;

		const {data} = await axios.post("/api/user/logout");

		completedAction && completedAction();
		await asyncWait(DROP_ANIM_TIME);

		if (data.success) {
			this.props.UserContext.setUser(null);
		}
	}

	render() {
		return (
			<button
				className="dropdown__link"
				onClick={this.handleSubmit}
			>
				Log Out
			</button>
		);
	}
}

export default withUserContext(LogoutForm);
