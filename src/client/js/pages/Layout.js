import React, {Fragment} from "react";
import Header from "../components/Header.js";

/*
	General purpose component for rendering page Layouts. Rendered in page components to
	wrap the contents of the page.

	Takes an optional 'page' string prop that if given adds `page-PAGENAME` class to the
	content container element.
*/
const Layout = (props) => (
	<Fragment>
		<Header />
		<div className={`content-container ${props.page ? `page-${props.page}` : ""}`}>
			<div className="content">
				{props.children}
			</div>
		</div>
	</Fragment>
);

export default Layout;
