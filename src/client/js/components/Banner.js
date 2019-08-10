import React from "react";
import {DEFAULT_AVATAR_URL} from "constants";

const Banner = (props) => {
	const {user} = props;

	return (
		<div className="banner">
			<img
				className="banner__image"
				src={user.bannerUrl || DEFAULT_AVATAR_URL}
				alt={`${user.nick}'s Banner`}
			/>
		</div>
	);
};

export default Banner;
