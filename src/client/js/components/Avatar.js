import React from "react";
import {Link} from "react-router-dom";

/*
	Generic Avatar for the given users' profile picture.

	If `withLink` is not `false` then the Avatar can be clicked
	to go to the given users' profile page.
*/
const Avatar = (props) => {
	const {user} = props;

	let component = (
		<img
			className="avatar__image"
			src={user.avatarUrl}
			alt={user.nick}
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
