const checkValidationErrors = require("../helpers/checkValidationErrors.js");

/*
	Appends validation error handling middleware to an existing chain of validation
	middlwares provided by a controller.

	The given `controller` must have a method `validate` that returns an array based
	on the value of `validator`.

	Eg,
		UserController.validate("createUser") -> validate(UserController, "createUser")
*/
module.exports = (controller, validator) => {
	return controller.validate(validator)
		.concat([checkValidationErrors]);
};
