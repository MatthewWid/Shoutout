import React, {useContext} from "react";
import {Link} from "react-router-dom";
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
		text: "Top",
		page: "top",
		to: "/top"
	}
];

const Header = (props) => {
	const theme = useContext(ThemeContext);

	const linkEls = links.map((link, index) => (
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
