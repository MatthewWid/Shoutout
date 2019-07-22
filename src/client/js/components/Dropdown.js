import React from "react";

/*
	Dropdown menu that transitions in/out.

	Renders children typically with the `dropdown__link` className.

	Parent components that render Dropdown should implement a `dropdownOpen` boolean
	in their state that it passes to the Dropdown component as the `isOpen` prop.

	The parent component should also implement the `dropdownSetOpen` method bound to
	its own instance that it passes to another component (Eg, a button) to open the
	dropdown menu.

	`dropdownSetOpen(false)` from the parent component should be passed to this
	component	as the `close` prop.
*/
class Dropdown extends React.Component {
	constructor(props) {
		super(props);

		this.dropdownEl = React.createRef();
	}

	handleClick = (evt) => {
		if (this.dropdownEl.current.contains(evt.target)) {
			return;
		}

		this.props.close && this.props.close();
	}

	componentWillMount() {
		document.addEventListener("mousedown", this.handleClick, false);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClick, false);
	}

	render() {
		return (
			<div
				className={`dropdown ${this.props.isOpen ? "dropdown--open" : ""}`}
				ref={this.dropdownEl}
			>
				{this.props.children}
			</div>
		);
	}
}

export default Dropdown;
