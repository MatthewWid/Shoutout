const path = require("path");
const jsonfile = require("jsonfile");
const MANIFEST_FILE = path.resolve(__dirname, "..", "./webpack-manifest.json");

function getManifest() {
	let file = null;

	try {
		file = jsonfile.readFileSync(MANIFEST_FILE);
	} catch (err) {
		console.error("SERVER No webpack-manifest file found.");
		process.exitCode = 1;
	}

	return (req, res, next) => {
		res.locals.manifest = file;

		return next();
	};
}

module.exports = getManifest;
