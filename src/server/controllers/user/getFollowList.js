const mongoose = require("mongoose");
const {mongoose: createProjection} = require("../../helpers/convertProjection.js");
const {PROJECTION_USER} = require("../../helpers/constants.js");
const Follow = mongoose.model("Follow");

const getFollowList = (field) => {
	// If finding who a user follows lookup by "follower" field
	// Else find by "followee"
	const findField = field === "following" ? "follower" : "followee";
	const popField = field === "following" ? "followee" : "follower";

	const controller = async (req, res) => {
		let followList = await Follow.aggregate()
			.match({
				[findField]: mongoose.Types.ObjectId(req.params.userId)
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

		res.json({
			success: true,
			followList
		});
	};

	return controller;
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
const ensureValidId = require("../../helpers/ensureValidId.js");
getFollowList.validate = [
	validator.param("userId", valErrMsg.notExists("User ID"))
		.exists()
		.custom(ensureValidId)
];

module.exports = getFollowList;
