import React from "react";
import UserContext from "./contexts/user.context.js";
import api from "api";
import Header from "./components/Header.js";
import MainRouter from "./MainRouter.js";

// Global App component that holds ubiquitously required state and functions
// Wraps global state and holds information on the currently logged in user
class App extends React.Component {
	state = {
		user: null,
		/*
			0 = Not attempted auth yet
			1 = Not logged in / Failed login
			2 = Successfully logged in
		*/
		loginStatus: 0
	}

	componentDidMount() {
		this.authUser();
	}

	// Set the currently logged in user
	setUser = (user) => {
		let loginStatus = 1;
		if (user !== null) {
			loginStatus = 2;
		}

		this.setState({
			user,
			loginStatus
		});
	}

	// Authenticate if the user is logged in or not (using a cookie) on page load
	authUser = async () => {
		const {data} = await api.get("/user/auth");

		this.setUser(data.user);
	}

	render() {
		return (
			<UserContext.Provider value={{
				user: this.state.user,
				loginStatus: this.state.loginStatus,
				setUser: this.setUser,
				authUser: this.authUser
			}}>
				<MainRouter />
			</UserContext.Provider>
		);
	}
}

export default App;
