const mongoose = require("mongoose");

const controller = async (req, res) => {
	const {userId} = req.params;

	res
		.status(201)
		.json({
			success: true,
			userId
		});
};

module.exports = controller;
