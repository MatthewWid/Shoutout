import React, {useEffect} from "react";
import Layout from "./Layout.js";
import PanelUser from "../components/PanelUser.js";
import PanelFeed from "../components/PanelFeed.js";
import PanelSiteInfo from "../components/PanelSiteInfo.js";

const Top = (props) => {
	useEffect(() => {
		document.title = "Top Posts - Shoutout";
	}, []);

	return (
		<Layout page="top">
			<PanelUser />
			<PanelFeed
				withForm={false}
				param="top"
			/>
			<PanelSiteInfo />
		</Layout>
	);
};

export default Top;
