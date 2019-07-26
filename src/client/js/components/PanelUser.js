import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import ProfileCard from "./ProfileCard.js";

/*
	Panel that displays user information such as a
	simplified view of their profile card, their stats,
	recommended pages and recommended users to follow.

	Will not render anything if the user is not logged in.
*/
const PanelUser = ({UserContext: {user}}) => !user ? null : (
	<div className="content__panel card panel-user">
		<ProfileCard user={user} />
	</div>
);

export default withUserContext(PanelUser);
