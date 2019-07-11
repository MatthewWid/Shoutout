export default function(change) {
	const action = change;

	return () => {
		this.setState({
			dropdownOpen: action
		});
	};
};
