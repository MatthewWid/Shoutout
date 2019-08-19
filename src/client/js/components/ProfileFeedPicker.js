import React, {Fragment, useState} from "react";
import PanelFeed from "../components/PanelFeed.js";

const ProfileFeedPicker = (props) => {
	/*
		TODO:
		Use React-Router URL match to make selection instead of state.
 	*/
	const [selection, setSelection] = useState(0); // 0 = PanelFeed

	let content = null;
	switch (selection) {
		case 0:
			content = (
				<PanelFeed
					withForm={false}
					query={{
						authorname: props.username
					}}
				/>
			);
			break;
	}

	return (
		<div className="content__panel panel-picker">
			<nav className="picker card nav">
				<a className="nav__link nav__link--current" href="#">Posts</a>
				<a className="nav__link" href="#">Likes</a>
				<a className="nav__link" href="#">Followers</a>
				<a className="nav__link" href="#">Following</a>
			</nav>
			{content}
		</div>
	);
}

export default ProfileFeedPicker;
