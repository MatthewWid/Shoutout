import React from "react";

class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<div className="header__inner">
					<nav className="header__nav">Navigation</nav>
					<div className="header__logo">
						<img src="./images/logo.png" alt="Shoutout" />
					</div>
					<div className="header__extra">Extra</div>
				</div>
			</div>
		);
	}
}

export default Header;
