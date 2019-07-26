import React, {useEffect} from "react";
import Layout from "./Layout.js";
import UserPanel from "../components/UserPanel.js";
import SettingsPanel from "../components/SettingsPanel.js";

const Settings = (props) => {
	useEffect(() => {
		document.title = "Settings - Shoutout";
	}, []);

	return (
		<Layout page="settings">
			<UserPanel />
			<SettingsPanel />
		</Layout>
	);
};

export default Settings;
