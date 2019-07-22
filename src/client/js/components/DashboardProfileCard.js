import React from "react";
import {Link} from "react-router-dom";
import Avatar from "./Avatar";

/*
	Profile card displaying the currently logged in users'
	information/statistics on the homepage.
*/
const DashboardProfileCard = (props) => {
	const {user} = props;

	return (
		<div className="dash-profile">
			<img
				className="dash-profile__banner"
				src={user.bannerUrl}
				alt=""
			/>
			<div className="dash-profile__info">
				<Avatar user={user} />
				<div className="dash-profile__names">
					<Link to={`/${user.name}`}>
						<p className="dash-profile__nick">{user.nick}</p>
						<p className="dash-profile__name">@{user.name}</p>
					</Link>
				</div>
			</div>
			<div className="dash-profile__stats"></div>
		</div>
	);
};

export default DashboardProfileCard;
