import React from "react";
import ProfileCard from "./ProfileCard.js";

const FollowList = (props) => {
	const contents = (props.followList && props.followList.length !== 0) ?
	(
		props.followList.map((user, index) => (
			<ProfileCard
				key={index}
				className="follow-list__card card"
				user={user}
			/>
		))
	) : <p className="follow-list__empty">There's no one here, yet.</p>;

	return (
		<div className="follow-list">
			{contents}
		</div>
	);
};

export default FollowList;
