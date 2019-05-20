const mongoose = require("mongoose");
const Post = require("../models/Post");

exports.homePage = async (req, res) => {
	const posts = await Post.find();

	res.render("home", {
		title: "Homepage",
		posts
	});
};
