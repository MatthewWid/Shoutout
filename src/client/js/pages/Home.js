import React, {useEffect, useContext} from "react";
import UserContext from "../contexts/user.context.js";
import Layout from "./Layout.js";
import PanelUser from "../components/PanelUser.js";
import PanelFeed from "../components/PanelFeed.js";
import PanelSiteInfo from "../components/PanelSiteInfo.js";

const Home = (props) => {
	const {loginStatus} = useContext(UserContext);

	useEffect(() => {
		document.title = "Shoutout"
	}, []);

	return (
		<Layout page="home">
			<PanelUser />
			<PanelFeed
				param={loginStatus === 2 ? "curated" : null}
				query={{
					sort: "new"
				}}
			/>
			<PanelSiteInfo />
		</Layout>
	);
};

export default Home;
