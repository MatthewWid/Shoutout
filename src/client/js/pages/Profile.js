import React, {Fragment, useEffect, useState} from "react";
import {DEFAULT_BANNER_URL} from "constants";
import Header from "../components/Header.js";
import Banner from "../components/Banner.js";
import ProfileFeedPicker from "../components/ProfileFeedPicker.js";
import ProfileUser from "../components/ProfileUser.js";

const getPageName = (path) => {
	const split = path.split("/");
	const page = split[split.length - 1];
	return page;
};

const Profile = (props) => {
	const [user, setUser] = useState(null);
	const {username} = props.match.params;
	const page = getPageName(props.match.path);

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
						page={page}
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Profile;
