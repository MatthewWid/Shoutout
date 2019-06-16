const mongoose = require("mongoose");
const Post = require("../models/Post.js");

exports.indexPage = (req, res) => {
	res.render("index");
};
