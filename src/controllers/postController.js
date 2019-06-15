const mongoose = require("mongoose");
const Post = require("../models/Post");

exports.indexPage = (req, res) => {
	res.render("index");
};
