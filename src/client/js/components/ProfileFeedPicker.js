import React, {Fragment, useState} from "react";
import PanelFeed from "../components/PanelFeed.js";

const ProfileFeedPicker = (props) => {
	const [selection, setSelection] = useState(0); // 0 = PanelFeed

	let content;
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
			{content}
		</div>
	);
}

export default ProfileFeedPicker;
