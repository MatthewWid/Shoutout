import React, {useContext} from "react";
import {Link} from "react-router-dom";
import UserContext from "../contexts/user.context.js";
import ThemeContext from "../contexts/theme.context.js";
import SessionDetails from "./SessionDetails.js";
import ThemeToggleButton from "./ThemeToggleButton.js";

const links = [
	{
		text: "Home",
		page: "home",
		to: "/"
	},
	{
		text: "All",
		page: "all",
		to: "/all"
	},
	{
		text: "Top",
		page: "top",
		to: "/top"
	}
];

const Header = (props) => {
	const {user} = useContext(UserContext);
	const theme = useContext(ThemeContext);

	let linkEls = [...links];
	if (!user) {
		linkEls = linkEls.filter((link) => link.page !== "all");
	}
	linkEls = linkEls.map((link, index) => (
		<Link
			className={`header__link${props.page === link.page ? " header__link--current" : ""}`}
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
					<img src={`./images/logo/logo-maxres-text-transparent${theme.isDark ? "-bright" : ""}.png`} alt="Shoutout" />
				</div>
				<div className="header__section header__extra">
					<ThemeToggleButton />
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
