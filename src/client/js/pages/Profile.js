import React, {Fragment, useEffect, useState} from "react";
import {DEFAULT_BANNER_URL} from "constants";
import Header from "../components/Header.js";
import Banner from "../components/Banner.js";
import ProfileFeedPicker from "../components/ProfileFeedPicker.js";
import ProfileUser from "../components/ProfileUser.js";

const Profile = (props) => {
	const [user, setUser] = useState(null);
	const {username} = props.match.params;

	useEffect(() => {
		document.title = `@${username} - Shoutout`
	}, []);

	return (
		<Fragment>
			<Header page="profile" />
			<div className={`content-container page-profile`}>
				<Banner user={user} />
				<div className="content">
					<ProfileUser
						query={{
							username
						}}
						foundUser={setUser}
					/>
					<ProfileFeedPicker
						username={username}
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Profile;
