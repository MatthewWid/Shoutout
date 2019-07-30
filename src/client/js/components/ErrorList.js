import React from "react";

const ErrorList = ({errors}) => {
	if (!errors) {
		return null;
	}

	const errorList = errors.map((error, index) => (
		<li
			className="errors__error"
			key={index}
		>
			{error}
		</li>
	));

	return (
		<div className="errors">
			<ul className="errors__list">
				{errorList}
			</ul>
		</div>
	);
};

export default ErrorList;
