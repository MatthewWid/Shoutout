import React from "react";

// Renders user submitted links that appear in
// post text bodies
const UserLink = (href, text, key) => (
	<a
		className="post__text-link"
		href={href}
		key={key}
		target="_blank"
	>
		{text}
	</a>
);

export default UserLink;
