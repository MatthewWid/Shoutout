import React from "react";
import Header from "./components/Header.js";
import MainRouter from "./Router.js";

// Global App component that holds ubiquitously required state and functions
class App extends React.Component {
	state = {
		user: null
	}

	render() {
		return (
			<MainRouter />
		);
	}
}

export default App;
