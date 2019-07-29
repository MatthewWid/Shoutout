/*
	Extract error status from a given `data` object returned
	from the API and normalise into an array.

	If the action was a success or there were no errors to format
	then simply return an empty array.
*/
export default (data) => {
	// If the action was a success do not attempt to set errors
	if (data.success) {
		return false;
	}

	const errors = [];

	if (data.errors) {
		errors.push(...data.errors.map((error) => error.msg));
	} else if (data.msg) {
		errors.push(data.msg);
	}

	console.log(errors);

	return errors;
};
