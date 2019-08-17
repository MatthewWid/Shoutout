import React from "react";
import {Link} from "react-router-dom";
import FormLogout from "./FormLogout.js";

const UserLinks = (props) => {
	return (
		<React.Fragment>
			<Link to={`/${props.user.name}`}>
				<button className="dropdown__link">My Profile</button>
			</Link>
			<Link to="/settings">
				<button className="dropdown__link">Settings</button>
			</Link>
			<FormLogout
				className="dropdown__link"
				completedAction={props.closeAndRedirect}
			/>
		</React.Fragment>
	);
};

export default UserLinks;
