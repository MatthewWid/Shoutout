import React, {useContext} from "react";
import UserContext from "../contexts/user.context.js";
import ProfileCard from "./ProfileCard.js";

/*
	Panel that displays user information such as a
	simplified view of their profile card, their stats,
	recommended pages and recommended users to follow.

	Will not render anything if the user is not logged in.
*/
const PanelUser = () => {
	const {user} = useContext(UserContext);

	if (!user) {
		return null;
	}

	return (
		<main className="content__panel card panel-user">
			<ProfileCard user={user} />
		</main>
	);
};

export default PanelUser;
