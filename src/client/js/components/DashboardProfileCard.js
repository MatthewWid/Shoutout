import React from "react";
import Avatar from "./Avatar";

const DashboardProfileCard = (props) => {
	const {user} = props;

	return (
		<div className="dash-profile">
			<img
				className="dash-profile__banner"
				src={user.bannerUrl || "./images/banner-default.png"}
				alt=""
			/>
			<div className="dash-profile__info">
				<Avatar user={user} />
				<div className="dash-profile__names">
					<p className="dash-profile__nick">{user.nick}</p>
					<p className="dash-profile__name">@{user.name}</p>
				</div>
			</div>
			<div className="dash-profile__stats"></div>
		</div>
	);
};

export default DashboardProfileCard;
