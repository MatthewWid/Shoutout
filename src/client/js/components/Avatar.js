import React from "react";
import {Link} from "react-router-dom";
import {DEFAULT_AVATAR_URL} from "constants";

/*
	Generic Avatar for the given users' profile picture.

	If `withLink` is not `false` then the Avatar can be clicked
	to go to the given users' profile page.

	Requires the users' `avatar.url` and `nick` properties and
	the `name` property if `props.withLink` is `false`.
*/
const Avatar = (props) => {
	const {user} = props;

	let component = (
		<img
			className="avatar__image"
			src={user.avatar.url || DEFAULT_AVATAR_URL}
			alt={`${user.nick}'s Avatar`}
		/>
	);

	if (props.withLink !== false) {
		component = (
			<Link to={`/${user.name}`}>
				{component}
			</Link>
		);
	}

	return (
		<div className="avatar" onClick={props.onClick}>
			{component}
		</div>
	);
};

export default Avatar;
