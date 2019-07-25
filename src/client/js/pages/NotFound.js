import React, {useEffect} from "react";
import Layout from "./Layout.js";
import {Link} from "react-router-dom";

const NotFound = (props) => {
	useEffect(() => {
		document.title = "404 Not Found - Shoutout"
	}, [])

	return (
		<Layout page="notfound">
			<h1>Page Not Found</h1>
		</Layout>
	);
};

export default NotFound;
