const mongoose = require("mongoose");
const Follow = mongoose.model("Follow");

// Add a follow to a single user
const controller = async (req, res) => {
	const {userId: followeeId} = req.params;
	const {_id: followerId} = req.user;

	// Prevent user from following themselves
	if (followerId.equals(followeeId)) {
		return res
			.status(400)
			.json({
				success: false,
				msg: "You cannot follow yourself."
			});
	}

	try {
		await Follow.create({
			follower: followerId,
			followee: followeeId
		});
	} catch (err) {
		return res
			.status(409)
			.json({
				success: false,
				msg: "Already following user."
			});
	}

	res
		.status(201)
		.json({
			success: true,
			followeeId: followeeId
		});
};

module.exports = controller;
