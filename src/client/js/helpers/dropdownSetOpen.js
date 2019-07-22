// Passed to child components of the component that contains the dropdown
// to close the dropdown in the parent when the child completes an action
// such as a click or a data fetch
export default function(change) {
	const action = change;

	return async () => {
		// If the state is always the result of the action abort the operation
		// avoiding an extra unnecessary re-render.
		if (this.state.dropdownOpen === action) {
			return;
		}

		this.setState({
			dropdownOpen: action
		});
	};
};
