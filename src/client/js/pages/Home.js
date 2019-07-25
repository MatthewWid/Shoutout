import React, {useEffect} from "react";
import Layout from "./Layout.js";
import UserPanel from "../components/UserPanel.js";
import FeedPanel from "../components/FeedPanel.js";
import SiteInfoPanel from "../components/SiteInfoPanel.js";

const Home = (props) => {
	useEffect(() => {
		document.title = "Shoutout"
	}, []);

	return (
		<Layout page="home">
			<UserPanel />
			<FeedPanel />
			<SiteInfoPanel />
		</Layout>
	);
};

export default Home;
