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
	if (req.body.name) {
		newFields.name = req.body.name;
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
		select: `${PROJECTION_USER} email`,
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
const ensureAllowedName = require("../../helpers/ensureAllowedName.js");
const valErrMsg = require("../../helpers/validationErrorMsg.js");
controller.validate = [
	validator.body("nick", valErrMsg.notValid("Nickname"))
		.optional({
			nullable: true
		})
		.isString()
		.isLength({
			min: 1,
			max: 50
		})
			.withMessage(valErrMsg.len("Nickname", 1, 50)),

	validator.body("name", valErrMsg.notExists("Username"))
		.optional({
			nullable: true
		})
		.isString()
		.isAlphanumeric()
			.withMessage(valErrMsg.alphaNum("Username"))
		.isLength({
			min: 1,
			max: 50
		})
			.withMessage(valErrMsg.len("Username", 3, 50))
		.custom(ensureAllowedName)
			.withMessage(valErrMsg.disallowed("Username")),

	validator.body("email", valErrMsg.notValid("Email"))
		.optional({
			nullable: true
		})
		.isString()
		.isEmail()
];

module.exports = controller;
