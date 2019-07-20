import React, {Fragment} from "react";
import UserPanel from "../components/UserPanel.js";
import FeedPanel from "../components/FeedPanel.js";
import SiteInfoPanel from "../components/SiteInfoPanel.js";

class Home extends React.Component {
	render() {
		return (
			<Fragment>
				<UserPanel />
				<FeedPanel />
				<SiteInfoPanel />
			</Fragment>
		);
	}
}

export default Home;
