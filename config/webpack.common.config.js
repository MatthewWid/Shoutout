const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntirePlugin = require("webpack-fix-style-only-entries");

const PUBDIR = path.resolve(__dirname, "..", "./public/");
const SRCDIR = path.resolve(__dirname, "..", "./src/");
const SRCDIR_JS = path.join(SRCDIR, "./js/");
const SRCDIR_SCSS = path.join(SRCDIR, "./scss/");

const config = {
	entry: {
		"js/home": path.join(SRCDIR_JS, "home.js"),
		"js/profile": path.join(SRCDIR_JS, "profile.js"),
		"css/main": path.join(SRCDIR_SCSS, "main.scss")
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.s(c|a)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	output: {
		path: PUBDIR,
		filename: "[name].[contenthash].js"
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
		new ManifestPlugin({
			fileName: path.join(SRCDIR, "./webpack-manifest.json")
		}),
		new FixStyleOnlyEntirePlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		})
	]
};

module.exports = config;
