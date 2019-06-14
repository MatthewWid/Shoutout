const path = require("path");
const jsonfile = require("jsonfile");
const MANIFEST_FILE = path.resolve(__dirname, "..", "./webpack-manifest.json");

function getManifest() {
	const file = jsonfile.readFileSync(MANIFEST_FILE);

	return (req, res, next) => {
		res.locals.manifest = file;

		return next();
	};
}

module.exports = getManifest;
