/*
	Interface with the Cloudinary API via
	image uploading and deletion.

	Promisify callback-based API requests.
*/
const cloudinary = require("cloudinary").v2;

const upload = (data, tags = []) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(
			data,
			{
				folder: "shoutout",
				tags: ["shoutout", ...tags]
			},
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			})
	});
};

exports.upload = upload;
