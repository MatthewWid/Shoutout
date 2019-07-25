import React, {useEffect} from "react";
import Layout from "./Layout.js";
import FeedPanel from "../components/FeedPanel.js";
import ProfileUser from "../components/ProfileUser.js";

const Profile = (props) => {
	const {username} = props.match.params;

	useEffect(() => {
		document.title = `@${username} - Shoutout`
	}, []);

	return (
		<Layout page="profile">
			<ProfileUser
				query={{
					username
				}}
			/>
			<FeedPanel
				hasForm={false}
				query={{
					username
				}}
			/>
		</Layout>
	);
};

export default Profile;
