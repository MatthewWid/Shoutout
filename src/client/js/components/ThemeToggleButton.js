import React, {useState, useEffect} from "react";
import InlineSvg from "react-inlinesvg";

// Toggle the theme between light and dark mode
// When a change occurs save into local storage and retrieve
// the value to remember theme settings between sessions
const ThemeToggleButton = (props) => {
	const [themeDark, setThemeDark] = useState(false);

	useEffect(() => {
		const initThemeDark = JSON.parse(localStorage.getItem("themeDark"));
		if (initThemeDark !== null) {
			setThemeDark(initThemeDark);
		}
	}, []);

	useEffect(() => {
		if (themeDark) {
			document.documentElement.classList.add("theme-dark");
		} else {
			document.documentElement.classList.remove("theme-dark");
		}
		localStorage.setItem("themeDark", themeDark);
	}, [themeDark]);

	function toggleTheme() {
		setThemeDark(!themeDark);
	}

	return (
		<div
			className="theme-toggle"
			title="Toggle Dark/Light Theme"
			onClick={toggleTheme}
		>
			<InlineSvg
				className="theme-toggle__icon svg"
				src="./images/icons/moon-regular.svg"
				cacheGetRequests
			></InlineSvg>
		</div>
	);
};

export default ThemeToggleButton;
