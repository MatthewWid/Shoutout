const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntirePlugin = require("webpack-fix-style-only-entries");
const SRCDIR_JS = path.resolve(__dirname, "..", "./src/js/");
const SRCDIR_SCSS = path.resolve(__dirname, "..", "./src/scss/");

const config = {
	entry: {
		"js/home": path.resolve(SRCDIR_JS, "home.js"),
		"js/profile": path.resolve(SRCDIR_JS, "profile.js"),
		"css/main": path.resolve(SRCDIR_SCSS, "main.scss")
	},
	module: {
		rules: [
			{
				test: /\.s(c|a)ss/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	output: {
		path: path.resolve(__dirname, "..", "./public/"),
		filename: "[name].js"
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "js/vendor",
					enforce: true
				}
			}
		}
	},
	plugins: [
		new FixStyleOnlyEntirePlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		})
	]
};

module.exports = config;
