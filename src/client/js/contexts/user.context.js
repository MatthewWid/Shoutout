import React from "react";

const UserContext = React.createContext({
	user: null,
	setUser: () => {},
	authUser: () => {}
});

export default UserContext;
