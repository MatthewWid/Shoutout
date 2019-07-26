import React, {useEffect} from "react";
import Layout from "./Layout.js";
import PanelUser from "../components/PanelUser.js";
import PanelSettings from "../components/PanelSettings.js";

const Settings = (props) => {
	useEffect(() => {
		document.title = "Settings - Shoutout";
	}, []);

	return (
		<Layout page="settings">
			<PanelUser />
			<PanelSettings />
		</Layout>
	);
};

export default Settings;
