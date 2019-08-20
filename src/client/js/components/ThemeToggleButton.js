import React, {useContext} from "react";
import InlineSvg from "react-inlinesvg";
import ThemeContext, {withThemeContext} from "../contexts/theme.context.js";

// Toggle the theme between light and dark mode
// When a change occurs save into local storage and retrieve
// the value to remember theme settings between sessions
const ThemeToggleButton = (props) => {
	const theme = useContext(ThemeContext);

	return (
		<div
			className="theme-toggle"
			title="Toggle Dark/Light Theme"
			onClick={theme.toggleTheme}
		>
			<InlineSvg
				className="theme-toggle__icon svg"
				src={`/images/icons/moon-${theme.isDark ? "solid" : "regular"}.svg`}
				cacheGetRequests
			/>
		</div>
	);
};

export default ThemeToggleButton;
