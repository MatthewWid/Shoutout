import React from "react";
import {Link} from "react-router-dom";
import SiteStats from "./SiteStats.js";

const PanelSiteInfo = (props) => {
	return (
		<div className="content__panel panel-site-info">
			<SiteStats />
			<div className="panel-site-info__section panel-site-info__links card">
				<a
					className="panel-site-info__link"
					href="https://github.com/MatthewWid/Shoutout"
					target="_blank"
				>Source Code</a>

				<Link
					className="panel-site-info__link"
					to="/attribution"
				>Attribution</Link>
			</div>
			<div className="panel-site-info__section card">
				<p>&copy; {(new Date()).getFullYear()} Matthew W.</p>
			</div>
		</div>
	);
};

export default PanelSiteInfo;
