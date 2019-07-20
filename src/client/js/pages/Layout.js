import React from "react";

const Layout = (props) => (
	<div className="content-container">
		<div className="content">
			{props.children}
		</div>
	</div>
);

export default Layout;
