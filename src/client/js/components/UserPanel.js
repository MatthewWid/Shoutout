import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import DashboardProfileCard from "./DashboardProfileCard.js";

// If there is no user logged in do not render
const UserPanel = ({UserContext: {user}}) => !user ? null : (
	<div className="content__panel card user">
		<DashboardProfileCard user={user} />
	</div>
);

export default withUserContext(UserPanel);
