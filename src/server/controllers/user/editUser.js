const mongoose = require("mongoose");
const {upload, destroy} = require("../../helpers/cloudinary.interface.js");
const {PROJECTION_USER} = require("../../helpers/constants.js");
const User = mongoose.model("User");

// Update profile settings and preferences of a single user
const controller = async (req, res) => {
	const prevUser = await User.findById(req.params.userId);

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
	if (req.body.avatar) {
		// Delete the previous avatar image off the CDN
		if (prevUser.avatar.public_id) {
			await destroy(prevUser.avatar.public_id);
		}
		const image = await upload(
			req.body.avatar,
			[
				prevUser._id,
				`@${prevUser.name}`,
				"avatar"
			],
			[
				{
					width: 256,
					height: 256,
					aspect_ratio: "1:1",
					crop: "fill",
					quality: "auto:good"
				}
			]
		);
		const {public_id, url, bytes: size} = image;

		newFields.avatar = {
			public_id,
			url,
			size
		};
	}
	if (req.body.banner) {
		// Delete the previous avatar image off the CDN
		if (prevUser.banner.public_id) {
			await destroy(prevUser.banner.public_id);
		}
		const image = await upload(
			req.body.banner,
			[
				prevUser._id,
				`@${prevUser.name}`,
				"banner"
			],
			[
				{
					width: 1500,
					height: 500,
					aspect_ratio: "3:1",
					crop: "fill",
					gravity: "center",
					quality: "auto:good"
				}
			]
		);
		const {public_id, url, bytes: size} = image;

		newFields.banner = {
			public_id,
			url,
			size
		};
	}

	const user = await User.findByIdAndUpdate(req.params.userId, {
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
