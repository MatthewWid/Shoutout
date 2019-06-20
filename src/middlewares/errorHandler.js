const errorHandler = (err, req, res, next) => {
	if (!err.errors) {
		return next(err);
	}
	console.log("SERVER Validation error reached:");
	console.error(err.errors);

	res.status(500)
		.send("500 Internal Server Error");
};

module.exports = errorHandler;
