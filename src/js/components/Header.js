import React from "react";
import SessionDetails from "./SessionDetails.js";

class Header extends React.Component {
	render() {
		let sessionElement;

		if (this.props.user) {} else {
			sessionElement = (
				<SessionDetails
					login={this.props.login}
					signup={this.props.signup}
				/>
			);
		}

		return (
			<div className="header-container">
				<header className="header">
					<nav className="header__nav">Navigation</nav>
					<div className="header__logo">
						<img src="./images/logo/logo.png" alt="Shoutout" />
					</div>
					<div className="header__extra">
						{sessionElement}
					</div>
				</header>
			</div>
		);
	}
}

export default Header;
