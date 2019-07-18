import React from "react";

const UserContext = React.createContext({
	user: null,
	setUser: () => {},
	authUser: () => {}
});

const withUserContext = (WrappedComponent) => {
	return (props) => (
		<UserContext.Consumer>
			{(context) => <WrappedComponent UserContext={UserContext} {...props} />}
		</UserContext.Consumer>
	);
};

export {UserContext as default, withUserContext};
