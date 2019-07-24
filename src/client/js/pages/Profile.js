import React, {Fragment} from "react";
import Layout from "./Layout.js";
import FeedPanel from "../components/FeedPanel.js";

const Profile = (props) => {
	const {username} = props.match.params;

	return (
		<Layout page="profile">
			<FeedPanel
				hasForm={false}
				query={{
					username: username
				}}
			/>
		</Layout>
	);
};

export default Profile;
