import React, {useEffect, useRef} from "react";
import {Transition} from "react-transition-group";

/*
	Dropdown menu that transitions in/out.

	Renders children typically with the `dropdown__link` className.

	Parent components that render Dropdown should implement a `dropdownOpen` boolean
	in their state that it passes to the Dropdown component as the `isOpen` prop.

	A function to close the dropdown in the parent component (by setting its
	`dropdownOpen` state boolean to false) should be passed to this component
	as the `close` prop.
*/
const Dropdown = (props) => {
	const dropdownEl = useRef(null);

	const handleClick = (evt) => {
		if (dropdownEl.current.contains(evt.target)) {
			return;
		}

		props.close && props.close();
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClick, false);

		return () => {
			document.removeEventListener("mousedown", handleClick, false);
		};
	}, []);

	return (
		<Transition in={props.isOpen} timeout={200}>
			{(state) => (
				<div
					className={`dropdown dropdown--${state}`}
					aria-hidden={props.isOpen}
					ref={dropdownEl}
				>
					{props.children}
				</div>
			)}
		</Transition>
	);
};

export default Dropdown;
