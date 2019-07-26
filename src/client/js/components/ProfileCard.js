import React from "react";
import {Link} from "react-router-dom";
import Avatar from "./Avatar.js";

/*
	Presentational component to render a users' profile card.

	Requires a `user` object prop that represents the given user.
*/
const ProfileCard = (props) => {
	const {user} = props;

	if (!user) {
		return null;
	}

	return (
		<div className={`${props.className && (`${props.className} `) || ""}card profile-card`}>
		{/* If the `className` prop is supplied then add the classNames to this component. */}
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
			{props.children}
		</div>
	);
};

export default ProfileCard;