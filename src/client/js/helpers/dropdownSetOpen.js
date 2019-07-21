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
