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

exports.getAllPosts = async (req, res) => {
	const posts = await Post.find()
		.sort({
			created: -1
		});

	res.json(posts);
};
