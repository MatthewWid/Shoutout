import React, {Fragment} from "react";
import UserPanel from "../components/UserPanel.js";
import FeedPanel from "../components/FeedPanel.js";
import SiteInfoPanel from "../components/SiteInfoPanel.js";

const Home = (props) => (
	<Fragment>
		<UserPanel />
		<FeedPanel />
		<SiteInfoPanel />
	</Fragment>
);

export default Home;
