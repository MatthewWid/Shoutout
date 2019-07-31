// Log the user out
const controller = (req, res) => {
	req.logout();
	
	res.json({
		success: true
	});
};

module.exports = controller;
