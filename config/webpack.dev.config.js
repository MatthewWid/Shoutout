const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const config = {
	mode: "development",
	plugins: [
		new CleanWebpackPlugin({
			root: path.resolve(__dirname, "..", "/public/"),
			cleanOnceBeforeBuildPatterns: ["!.gitkeep"]
		})
	],
	stats: "minimal"
};

module.exports = config;
