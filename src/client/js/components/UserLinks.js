import React, {Fragment, useContext} from "react";
import {Link} from "react-router-dom";
import InlineSvg from "react-inlinesvg";
import UserContext from "../contexts/user.context.js";
import api from "api";
import {DROP_ANIM_TIME} from "constants";
import asyncWait from "../helpers/asyncWait.js";

const UserLinks = (props) => {
	const user = useContext(UserContext);

	// Log out the existing user
	const logoutSubmit = async () => {
		const {data} = await api.post("/user/logout");

		await asyncWait(DROP_ANIM_TIME);

		if (data.success) {
			user.setUser(null);
			props.closeAndRedirect && props.closeAndRedirect();
		}
	};

	return (
		<Fragment>
			<Link to={`/${props.user.name}`}>
				<button className="dropdown__link">
					My Profile
					<InlineSvg
						className="svg dropdown__icon"
						src="/images/icons/profile.svg"
						cacheGetsRequests
					/>
				</button>
			</Link>
			<Link to="/settings">
				<button className="dropdown__link">
					Settings
					<InlineSvg
						className="svg dropdown__icon"
						src="/images/icons/cog.svg"
						cacheGetsRequests
					/>
				</button>
			</Link>
			<button className="dropdown__link" onClick={logoutSubmit}>
				Log Out
				<InlineSvg
					className="svg dropdown__icon"
					src="/images/icons/signout.svg"
					cacheGetsRequests
				/>
			</button>
		</Fragment>
	);
};

export default UserLinks;
