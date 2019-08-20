import React, {useContext} from "react";
import {Link} from "react-router-dom";
import InlineSvg from "react-inlinesvg";
import UserContext from "../contexts/user.context.js";
import ThemeContext from "../contexts/theme.context.js";
import SessionDetails from "./SessionDetails.js";
import ThemeToggleButton from "./ThemeToggleButton.js";

const links = [
	{
		text: "Home",
		page: "home",
		to: "/",
		icon: "home-solid"
	},
	{
		text: "All",
		page: "all",
		to: "/all",
		icon: "globe-solid"
	},
	{
		text: "Top",
		page: "top",
		to: "/top",
		icon: "heart-solid"
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
			className={`nav__link${props.page === link.page ? " nav__link--current" : ""}${link.page && ` nav__link-${link.page}`}`}
			to={link.to}
			key={index}
		>
			{
				link.icon &&
				<InlineSvg
					className="svg nav__icon"
					src={`/images/icons/${link.icon}.svg`}
					cacheGetsRequests
				/>
			}
			{link.text}
		</Link>
	));

	return (
		<div className="header-container">
			<header className="header">
				<nav className="header__section nav">
					{linkEls}
				</nav>
				<div className="header__section header__logo">
					<Link to="/">
						<img src={`./images/logo/logo-small-text-transparent${theme.isDark ? "-bright" : ""}.png`} alt="Shoutout" />
					</Link>
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
