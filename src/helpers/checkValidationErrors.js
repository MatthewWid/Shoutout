const validator = require("express-validator");

// Check if validation errors exist and if so return a 400 with the errors attached
module.exports = (req, res) => {
	const errors = validator.validationResult(req);
	if (!errors.isEmpty()) {
		res
			.status(400)
			.json({
				success: false,
				msg: "Validation error.",
				errors: errors.array()
			});
		return true;
	}

	return false;
};
