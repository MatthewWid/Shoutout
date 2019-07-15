import React from "react";
import UserContext from "./contexts/user.context.js";
import Header from "./components/Header.js";
import MainRouter from "./Router.js";

// Global App component that holds ubiquitously required state and functions
class App extends React.Component {
	state = {
		user: null
	}

	// Set the currently logged in user
	setUser = (user) => {
		this.setState({
			user
		});
	}

	render() {
		return (
			<UserContext.Provider value={{
				user: this.state.user,
				setUser: this.setUser
			}}>
				<MainRouter />
			</UserContext.Provider>
		);
	}
}

export default App;
