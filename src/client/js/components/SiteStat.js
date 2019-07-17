import React from "react";

const SiteStat = (props) => {
	return (
		<div className="stat">
			<div className="stat__number">{props.number}</div>
			<div className="stat__text">{props.stat}</div>
		</div>
	);
};

export default SiteStat;
