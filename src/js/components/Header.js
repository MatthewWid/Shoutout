import React from "react";

class Header extends React.Component {
	render() {
		const isLoggedIn = this.props.user !== null;

		return (
			<div className="header-container">
				<div className="header">
					<nav className="header__nav">Navigation</nav>
					<div className="header__logo">
						<img src="./images/logo/logo.png" alt="Shoutout" />
					</div>
					<div className="header__extra">{isLoggedIn}</div>
				</div>
			</div>
		);
	}
}

export default Header;
