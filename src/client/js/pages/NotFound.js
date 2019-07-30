import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Layout from "./Layout.js";

const NotFound = (props) => {
	useEffect(() => {
		document.title = "404 Not Found - Shoutout"
	}, [])

	return (
		<Layout page="notfound">
			<div className="content__panel card notfound">
				<h1 className="notfound__header">404 Oh no!</h1>
				<p className="notfound__text">We couldn't find what you're looking for.</p>
				<Link className="notfound__link" to="/">Go home</Link>
			</div>
		</Layout>
	);
};

export default NotFound;
