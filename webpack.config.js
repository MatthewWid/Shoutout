require("dotenv").config({path: "./variables.env"});
const common = require("./config/webpack.common.config.js");
const webpackMerge = require("webpack-merge");

const envs = {
	development: "dev",
	production: "prod"
};
const env = envs[process.env.NODE_ENV || "development"];
console.log(env);
const envConfig = require(`./config/webpack.${env}.config.js`);
module.exports = webpackMerge(common, envConfig);
