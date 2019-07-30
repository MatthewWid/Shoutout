import React from "react";
import SiteStats from "./SiteStats.js";

const PanelSiteInfo = (props) => {
	return (
		<div className="content__panel panel-site-info">
			<SiteStats />
			<div className="panel-site-info__copyright card">
				<p>&copy; {(new Date()).getFullYear()} Matthew W.</p>
			</div>
		</div>
	);
};

export default PanelSiteInfo;
