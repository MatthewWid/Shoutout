// Ensure that the current session contains an authenticated user
module.exports = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res
			.status(401)
			.json({
				success: false,
				msg: "User failed to authenticate."
			});
	}
};
