const errorHandler = (err, req, res, next) => {
	if (!err.errors) {
		return next(err);
	}
	console.log("SERVER Validation error reached:");
	console.error(err.errors);

	res
		.status(500)
		.json({
			success: false,
			msg: "500 Internal server error."
		});
};

module.exports = errorHandler;
