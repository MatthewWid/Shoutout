import React from "react";

const SiteStats = (props) => {
	const {users, posts, likes} = props.stats;

	return (
		<div className="stats">
			<h1>Site Stats</h1>
			<div className="stats__list">
				<div className="stats__stat">Site Stat</div>
				<div className="stats__stat">Site Stat</div>
				<div className="stats__stat">Site Stat</div>
			</div>
		</div>
	);
}

export default SiteStats;
