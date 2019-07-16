export default function(change) {
	const action = change;

	return async () => {
		this.setState({
			dropdownOpen: action
		});
		await new Promise (r => setTimeout(r, 200));
	};
};
