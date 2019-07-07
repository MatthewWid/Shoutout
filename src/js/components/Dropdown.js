import React from "react";

const Dropdown = (props) => {
	return (
		<div className={`dropdown ${props.open ? "dropdown--open" : ""}`}>
			{props.children}
		</div>
	);
};

export default Dropdown;
