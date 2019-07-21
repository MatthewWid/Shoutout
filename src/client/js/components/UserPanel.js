import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import DashboardProfileCard from "./DashboardProfileCard.js";

class UserPanel extends React.Component {
	render() {
		const {user} = this.props.UserContext;

		if (!user) {
			return null;
		}

		return (
			<div className="content__panel card user">
				<DashboardProfileCard user={user} />
			</div>
		);
	}
}

export default withUserContext(UserPanel);
