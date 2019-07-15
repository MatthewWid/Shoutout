import React from "react";
import SiteStats from "./SiteStats.js";

const SiteInfoPanel = (props) => {
	return (
		<div className="content__panel site-info">
			<SiteStats />
			<div className="site-info__copyright">
				<p>&copy; {(new Date()).getFullYear()} Matthew W.</p>
			</div>
		</div>
	);
};

export default SiteInfoPanel;
