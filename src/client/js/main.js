import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
// Initialize API interface singleton object
import "api";

ReactDOM.render(
	<App />,
	document.getElementsByClassName("container")[0]
);
