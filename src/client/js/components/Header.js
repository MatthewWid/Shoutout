import React from "react";
import {Link} from "react-router-dom";
import SessionDetails from "./SessionDetails.js";

const links = [
	{
		text: "Home",
		page: "home",
		to: "/"
	},
	{
		text: "Notifications",
		page: "notifications",
		to: "/notifications"
	},
	{
		text: "Messages",
		page: "messages",
		to: "/messages"
	}
];

const Header = (props) => {
	const linkEls = links.map((link, index) => (
		<Link
			className={`header__link ${props.page === link.page ? "header__link--current" : ""}`}
			to={link.to}
			key={index}
		>
				{link.text}
		</Link>
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
