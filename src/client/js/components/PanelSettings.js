import React from "react";
import SettingsForm from "./SettingsForm.js";

class PanelSettings extends React.Component {
	render() {
		return (
			<div className="content__panel card panel-settings">
				<SettingsForm />
			</div>
		);
	}
}

export default PanelSettings;
