import React from "react";
import SiteStats from "./SiteStats.js";

const SiteInfoPanel = (props) => {
	return (
		<div className="content__panel card panel-site-info">
			<SiteStats />
			<div className="panel-site-info__copyright">
				<p>&copy; {(new Date()).getFullYear()} Matthew W.</p>
			</div>
		</div>
	);
};

export default SiteInfoPanel;
