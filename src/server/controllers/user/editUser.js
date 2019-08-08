const mongoose = require("mongoose");
const {PROJECTION_USER} = require("../../helpers/constants.js");
const User = mongoose.model("User");

// Update profile settings and preferences of a single user
const controller = async (req, res) => {
	const {userId} = req.params;

	const newFields = {};
	if (req.body.nick) {
		newFields.nick = req.body.nick;
	}
	if (req.body.email) {
		newFields.email = req.body.email;
	}
	if (req.body.avatarUrl) {
		newFields.avatarUrl = req.body.avatarUrl;
	}
	if (req.body.bannerUrl) {
		newFields.bannerUrl = req.body.bannerUrl;
	}

	const user = await User.findByIdAndUpdate(userId, {
		...newFields
	}, {
		select: PROJECTION_USER,
		new: true
	});

	if (user === null) {
		return res
			.status(404)
			.json({
				success: false,
				msg: "User not found or does not exist."
			});
	}

	res.json({
		success: true,
		user
	});
};

// Validation
const validator = require("express-validator");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
controller.validate = [
	validator.body("nick", valErrMsg.notValid("Nickname"))
		.optional()
		.isString()
		.isLength({
			min: 1,
			max: 50
		})
			.withMessage(valErrMsg.len("Nickname", 1, 50)),

	validator.body("email", valErrMsg.notValid("Email"))
		.optional()
		.isString()
		.isEmail(),

	validator.body("avatarUrl", valErrMsg.notValid("Avatar URL"))
		.optional()
		.isURL(),

	validator.body("bannerUrl", valErrMsg.notValid("Banner URL"))
		.optional()
		.isURL()
];

module.exports = controller;
