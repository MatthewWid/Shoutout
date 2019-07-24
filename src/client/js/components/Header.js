import React from "react";
import {Link} from "react-router-dom";
import SessionDetails from "./SessionDetails.js";

const links = [
	{
		text: "Home",
		name: "home",
		to: "/"
	},
	{
		text: "Notifications",
		name: "notifications",
		to: "/notifications"
	},
	{
		text: "Messages",
		name: "messages",
		to: "/messages"
	}
];

const Header = (props) => {
	const linkEls = links.map((link) => (
		<Link className="header__link" to={link.to}>{link.text}</Link>
	));

	return (
		<div className="header-container">
			<header className="header">
				<nav className="header__section header__nav">
					{linkEls}
				</nav>
				<div className="header__section header__logo">
					<img src="./images/logo/logo.png" alt="Shoutout" />
				</div>
				<div className="header__section header__extra">
					<SessionDetails
						login={props.login}
						signup={props.signup}
					/>
				</div>
			</header>
		</div>
	);
};

export default Header;
