import React from "react";
import {Link} from "react-router-dom";

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
