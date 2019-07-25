import React from "react";
import {Link} from "react-router-dom";
import Avatar from "./Avatar";

/*
	Profile card displaying the currently logged in users'
	information/statistics on the homepage.
*/
const ProfileDashboard = (props) => {
	const {user} = props;

	return (
		<div className="profile-card">
			<img
				className="profile-card__banner"
				src={user.bannerUrl}
				alt={user.nick}
			/>
			<div className="profile-card__info">
				<Avatar user={user} />
				<div className="profile-card__names">
					<Link to={`/${user.name}`}>
						<p className="profile-card__nick">{user.nick}</p>
						<p className="profile-card__name">@{user.name}</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProfileDashboard;
