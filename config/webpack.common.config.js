const path = require("path");
const SRCDIR_SCSS = path.resolve(__dirname, "..", "./src/SCSS/");
const SRCDIR_JS = path.resolve(__dirname, "..", "./src/js/");

const config = {
	entry: {
		"js/home": path.resolve(SRCDIR_JS, "home.js")
	},
	output: {
		path: path.resolve(__dirname, "..", "./public/"),
		filename: "[name].js"
	}
};

module.exports = config;
