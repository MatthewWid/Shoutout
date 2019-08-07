import React, {useEffect} from "react";
import UserContext from "../contexts/user.context.js";
import Layout from "./Layout.js";
import PanelUser from "../components/PanelUser.js";
import PanelFeed from "../components/PanelFeed.js";
import PanelSiteInfo from "../components/PanelSiteInfo.js";

const All = (props) => {
	useEffect(() => {
		document.title = "All Posts - Shoutout";
	}, []);

	return (
		<Layout page="all">
			<PanelUser />
			<PanelFeed
				withForm={false}
				query={{
					sort: "new"
				}}
			/>
			<PanelSiteInfo />
		</Layout>
	);
};

export default All;
