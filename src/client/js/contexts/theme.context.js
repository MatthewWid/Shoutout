import React from "react";

// Theme context tracking theme state between dark and light
const ThemeContext = React.createContext({
	isDark: false,
	setTheme: () => {},
	toggleTheme: () => {}
});

const withThemeContext = (WrappedComponent) => {
	const C = (props) => (
		<ThemeContext.Consumer>
			{(context) => <WrappedComponent ThemeContext={context} {...props} />}
		</ThemeContext.Consumer>
	);
	C.displayName = `withThemeContext(${WrappedComponent.displayName || WrappedComponent.name})`;
	C.WrappedComponent = WrappedComponent;

	return C;
}

export {ThemeContext as default, withThemeContext};
