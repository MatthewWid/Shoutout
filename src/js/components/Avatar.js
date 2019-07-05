import React from "react";

const Avatar = (props) => {
	const {user: {avatarUrl, nick}} = props;

	return (
		<div className="avatar">
			<img
				className="avatar__image"
				src={avatarUrl || "./images/avatar-default.png"}
				alt={nick}
			/>
		</div>
	);
};

export default Avatar;
