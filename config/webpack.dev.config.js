const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const config = {
	mode: "development",
	watch: true,
	plugins: [
		new CleanWebpackPlugin({
			root: path.resolve(__dirname, "..", "/public/"),
			cleanOnceBeforeBuildPatterns: ["!.gitkeep"]
		})
	]
};

module.exports = config;
