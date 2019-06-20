const passport = require("passport");

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log("SERVER Is authenticated");
		return next();
	}
	console.log("SERVER Is not authenticated");
}
