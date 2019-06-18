import React from "react";

const SiteInfo = () => {
	return (
		<div className="content__panel site-info">
			<p>Site Info</p>
			<p>&copy; {(new Date()).getFullYear()} Matthew W.</p>
		</div>
	);
};

export default SiteInfo;
