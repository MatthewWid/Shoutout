// Convert serialized search params to a database lookup query object
// And put it on the request object as `findParams`
const controller = (req, res, next) => {
	// Filter results
	const findParams = {};
	if ((req.searchParams.author || {})._id) {
		findParams.author = {
			_id: req.searchParams.author._id
		};
	}
	// If an author was found by username
	if (req.foundUser) {
		findParams.author = {
			_id: req.foundUser._id
		};
	// If an author was searched for but not found
	} else if (req.foundUser === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "User not found or does not exist"
			});
	}

	req.findParams = findParams;

	next();
};

module.exports = controller;
