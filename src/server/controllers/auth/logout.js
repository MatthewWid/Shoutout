// Log the user out
module.exports = (req, res) => {
	req.logout();
	
	res.json({
		success: true
	});
};
