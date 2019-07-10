import React from "react";
import SessionDetails from "./SessionDetails.js";

const Header = (props) => {
	return (
		<div className="header-container">
			<header className="header">
				<nav className="header__nav">Navigation</nav>
				<div className="header__logo">
					<img src="./images/logo/logo.png" alt="Shoutout" />
				</div>
				<div className="header__extra">
					<SessionDetails
						user={props.user}
						login={props.login}
						logout={props.logout}
						signup={props.signup}
					/>
				</div>
			</header>
		</div>
	);
};

export default Header;
