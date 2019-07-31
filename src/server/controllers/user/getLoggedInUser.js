// Return the currently authenticated / logged in user
const controller = (req, res) => {
	if (!req.user) {
		return res.json({
			success: true,
			user: null
		});
	}
	
	res.json({
		success: true,
		user: req.user
	});
};

module.exports = controller;
