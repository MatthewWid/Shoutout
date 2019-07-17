import React, {Fragment} from "react";
import UserPanel from "../components/UserPanel.js";
import FeedPanel from "../components/FeedPanel.js";
import SiteInfoPanel from "../components/SiteInfoPanel.js";

class Home extends React.Component {
	render() {
		return (
			<div className="content-container">
				<div className="content">
					<UserPanel />
					<FeedPanel />
					<SiteInfoPanel />
				</div>
			</div>
		);
	}
}

export default Home;
