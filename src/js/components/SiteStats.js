import React from "react";
import SiteStat from "./SiteStat.js";

const SiteStats = (props) => {
	const {users, posts, likes} = props.stats;

	return (
		<div className="stats">
			<div className="stats__list">
				<SiteStat stat="Users" number={users} />
				<SiteStat stat="Posts" number={posts} />
				<SiteStat stat="Likes" number={likes} />
			</div>
		</div>
	);
}

export default SiteStats;
