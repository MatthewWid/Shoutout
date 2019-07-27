import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import UserContext from "../contexts/user.context.js";

// HOC that renders its given component if the user is authenticated
// otherwise redirects the user to the homepage
const withAuth = (WrappedComponent) => {
	const C = (props) => {
		const user = useContext(UserContext);

		// If the user is not logged in and a login has been attempted
		// Redirect back to the homepage
		if (!user.user && user.loginStatus !== 0) {
			return <Redirect to="/" />;
		}

		return <WrappedComponent {...props} />;
	};
	C.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
	C.WrappedComponent = WrappedComponent;

	return C;
};

export default withAuth;
