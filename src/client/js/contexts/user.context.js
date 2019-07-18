import React from "react";

const UserContext = React.createContext({
	user: null,
	setUser: () => {},
	authUser: () => {}
});

const withUserContext = (WrappedComponent) => {
	return (props) => (
		<UserContext.Consumer>
			{(context) => <WrappedComponent UserContext={context} {...props} />}
		</UserContext.Consumer>
	);
};

export {UserContext as default, withUserContext};
