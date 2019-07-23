import React, {Fragment} from "react";
import Layout from "./Layout.js";
import FeedPanel from "../components/FeedPanel.js";

const Profile = (props) => (
	<Layout page="profile">
		<FeedPanel
			hasForm={false}
			query={{
				username: props.match.params.userName
			}}
		/>
	</Layout>
);

export default Profile;
