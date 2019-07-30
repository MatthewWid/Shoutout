import React from "react";
import UserContext from "./contexts/user.context.js";
import ThemeContext from "./contexts/theme.context.js";
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
		loginStatus: 0,

		// Colour theme
		isDark: false
	}

	componentDidMount() {
		this.authUser();
		this.getThemeInit();
	}

	componentDidUpdate() {
		this.setThemeClass();
	}

	/*
		User management
	*/
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

	/*
		Theming
	*/
	// Get the previously set theme from local storage (if any)
	// and set the current theme
	getThemeInit = () => {
		const initThemeDark = JSON.parse(localStorage.getItem("themeDark"));
		if (initThemeDark !== null) {
			this.setTheme(initThemeDark);
		}
	}

	setTheme = (shouldDark = false) => {
		this.setState({
			isDark: shouldDark
		});
	}

	toggleTheme = () => {
		this.setState({
			isDark: !this.state.isDark
		});
	}

	// Once the component theme update save the theme state in local storage
	// and add/remove the appropriate class from the root element to activate
	// the theme
	setThemeClass = () => {
		const {isDark} = this.state;

		localStorage.setItem("themeDark", isDark);
		if (isDark) {
			document.documentElement.classList.add("theme-dark");
		} else {
			document.documentElement.classList.remove("theme-dark");
		}
	}

	render() {
		return (
			<UserContext.Provider value={{
				user: this.state.user,
				loginStatus: this.state.loginStatus,
				setUser: this.setUser,
				authUser: this.authUser
			}}>
				<ThemeContext.Provider value={{
					isDark: this.state.isDark,
					setTheme: this.setTheme,
					toggleTheme: this.toggleTheme
				}}>
					<MainRouter />
				</ThemeContext.Provider>
			</UserContext.Provider>
		);
	}
}

export default App;
