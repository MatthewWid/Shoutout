const mongoose = require("mongoose");
const Post = require("../models/Post.js");

exports.indexPage = (req, res) => {
	res.render("index");
};

exports.createPost = async (req, res) => {
	const {text} = req.body;

	const post = await (new Post({
		text
	})).save();

	res.json(post);
};
