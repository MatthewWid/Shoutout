/*
	Interface with the Cloudinary API via
	image uploading and deletion.

	Promisify callback-based API requests.
*/
const cloudinary = require("cloudinary").v2;

const upload = (image, tags = []) => (
	new Promise((resolve, reject) => {
		cloudinary.uploader.upload(
			image,
			{
				folder: process.env.CLOUDINARY_FOLDER,
				tags: [process.env.CLOUDINARY_FOLDER, ...tags]
			},
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	})
);

const destroy = (public_id) => (
	new Promise((resolve, reject) => {
		cloudinary.uploader.destroy(
			public_id,
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	})
);

exports.upload = upload;
exports.destroy = destroy;
