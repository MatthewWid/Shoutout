// Ensure the currently logged in user owns the account they are attempting to manipulate
const controller = (req, res, next) => {
	const {userId} = req.params;

	// Check if the logged in user is editing themselves unless they are an admin
	if (!req.user._id.equals(userId) && !req.user.isAdmin) {
		return res
			.status(401)
			.json({
				success: false,
				msg: "Not authorised to operate on user."
			});
	}

	next();
};

module.exports = controller;
