import React from "react";
import {Link} from "react-router-dom";
import SessionDetails from "./SessionDetails.js";

const Header = (props) => {
	return (
		<div className="header-container">
			<header className="header">
				<nav className="header__nav">
					<Link
						className="header__link"
						to="/"
					>
						Home
					</Link>
				</nav>
				<div className="header__logo">
					<img src="./images/logo/logo.png" alt="Shoutout" />
				</div>
				<div className="header__extra">
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
