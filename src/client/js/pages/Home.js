import React, {useEffect} from "react";
import Layout from "./Layout.js";
import PanelUser from "../components/PanelUser.js";
import PanelFeed from "../components/PanelFeed.js";
import PanelSiteInfo from "../components/PanelSiteInfo.js";

const Home = (props) => {
	useEffect(() => {
		document.title = "Shoutout"
	}, []);

	return (
		<Layout page="home">
			<PanelUser />
			<PanelFeed />
			<PanelSiteInfo />
		</Layout>
	);
};

export default Home;
