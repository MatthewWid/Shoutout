const {upload} = require("../helpers/cloudinary.interface.js");
const attachImageObj = (req) => {req.image = req.image || {}};

const uploadImage = (bodyParam) => {
	return async (req, res, next) => {
		const imageData = req.body[bodyParam];
		if (!imageData) {
			return next();
		}
		attachImageObj(req);

		const uploadedImage = await upload(
			imageData,
			[
				req.user._id,
				`@${req.user.name}`
			]
		);
		
		req.image[bodyParam] = uploadedImage;

		next();
	};
};

module.exports = uploadImage;
