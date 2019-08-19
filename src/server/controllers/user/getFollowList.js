const mongoose = require("mongoose");
const {mongoose: createProjection} = require("../../helpers/convertProjection.js");
const {PROJECTION_USER} = require("../../helpers/constants.js");
const User = mongoose.model("User");
const Follow = mongoose.model("Follow");

const controller = async (req, res) => {
	// User filtering
	const findUser = {};

	// Username
	if (req.query.username) {
		findUser.name = req.query.username;
	}
	// Unique ID
	if (req.query.userid) {
		findUser._id = req.query.userid;
	}

	const user = await User.findOne(findUser);

	if (user === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "User not found or does not exist."
			});
	}

	const {list: field} = req.query;
	const findField = field === "following" ? "follower" : "followee";
	const popField = field === "following" ? "followee" : "follower";

	let followList = await Follow.aggregate()
		.match({
			[findField]: user._id
		})
		.lookup({
			from: "users",
			localField: popField,
			foreignField: "_id",
			as: popField
		})
		.unwind(popField)
		.project(createProjection(PROJECTION_USER, popField));

	followList = followList.map((follow) => ({
		...follow[popField]
	}));

	followList = await Promise.all(
		followList.map(async (follow) => {
			// If the user is not logged in - set to false
			if (!req.isAuthenticated()) {
				return {
					...follow,
					isFollowing: false
				};
			}
			// If the user is logged in and we are searching the logged in users'
			// following list we already know they are all `true`
			if (req.user._id.equals(req.params.userId) && field === "following") {
				return {
					...follow,
					isFollowing: true
				};
			}
			// Else calculate whether the logged in user follows
			// the given user dynamically
			return {
				...follow,
				isFollowing: await Follow.userFollowsUser(follow, req.user)
			};
		})
	);

	res.json({
		success: true,
		followList
	});
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
const ensureValidId = require("../../helpers/ensureValidId.js");
controller.validate = [
	validator.query("list", valErrMsg.notExists("list"))
		.exists()
		.isIn(["following", "followers"]),

	validator.oneOf([
		validator.query("userid", valErrMsg.notValid("User ID"))
			.exists()
			.custom(ensureValidId),

		validator.query("username", valErrMsg.notValid("Username"))
			.exists()
			.isString()
	], valErrMsg.filters("User"))
];

module.exports = controller;
