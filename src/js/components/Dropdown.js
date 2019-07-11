import React from "react";

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
