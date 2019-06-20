import React from "react";

class Header extends React.Component {
	render() {
		return (
			<div className="header-container">
				<div className="header">
					<nav className="header__nav">Navigation</nav>
					<div className="header__logo">
						<img src="./images/logo/logo.png" alt="Shoutout" />
					</div>
					<div className="header__extra">Extra</div>
				</div>
			</div>
		);
	}
}

export default Header;
