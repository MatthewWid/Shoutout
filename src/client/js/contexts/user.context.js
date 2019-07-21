import React from "react";

const UserContext = React.createContext({
	user: null,
	loginStatus: 0,
	setUser: () => {},
	authUser: () => {}
});

const withUserContext = (WrappedComponent) => {
	const C = (props) => (
		<UserContext.Consumer>
			{(context) => <WrappedComponent UserContext={context} {...props} />}
		</UserContext.Consumer>
	);
	C.displayName = `withUserContext(${WrappedComponent.displayName || WrappedComponent.name})`;
	C.WrappedComponent = WrappedComponent;

	return C;
};

export {UserContext as default, withUserContext};
