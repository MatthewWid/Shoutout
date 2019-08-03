const mongoose = require("mongoose");
const Follow = mongoose.model("Follow");

// Remove a follow from a single user
const controller = async (req, res) => {
	const {userId: followeeId} = req.params;
	const {_id: followerId} = req.user;

	const {deletedCount} = await Follow.deleteOne({
		follower: followerId,
		followee: followeeId
	});

	res.json({
		success: true,
		foundFollow: deletedCount && true || false
	});
};

module.exports = controller;
