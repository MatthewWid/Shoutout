const path = require("path");
const jsonfile = require("jsonfile");
const MANIFEST_FILE = path.resolve(__dirname, "..", "./webpack-manifest.json");

// Get and parse the contents of the generated webpack
// manifest file `webpack-manifest.json` and insert it into
// a local view variable to be included into a page.
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
