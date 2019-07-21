import React, {Fragment} from "react";
import FeedPanel from "../components/FeedPanel.js";

const Profile = (props) => {
	return <Fragment>
		<FeedPanel
			hasForm={false}
			query={{
				username: props.match.params.userName
			}}
		/>
	</Fragment>
};

export default Profile;
