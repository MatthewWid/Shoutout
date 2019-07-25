import React from "react";
import ReactDOM from "react-dom";
// Initialize API config singleton
import "./api.js";
import App from "./App.js";

ReactDOM.render(
	<App />,
	document.getElementsByClassName("container")[0]
);
