import React from "react";
import {DEFAULT_BANNER_URL} from "constants";

/*
	Generic Banner for the given users' profile picture.

	Requires the users' `banner.url` and `nick` properties.
*/
const Banner = (props) => {
	const {user} = props;

	return (
		<div className="banner">
			{
				user &&
				<img
					className="banner__image"
					src={user.banner.url || DEFAULT_BANNER_URL}
					alt={`${user.nick}'s Banner`}
				/> ||
				<img
					className="banner__image"
					src={DEFAULT_BANNER_URL}
					alt="Banner"
				/>
			}
		</div>
	);
};

export default Banner;
