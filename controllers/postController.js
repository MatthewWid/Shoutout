const mongoose = require("mongoose");

exports.homePage = async (req, res) => {
	const posts = await mongoose.model("Post").find();
	console.log(posts);

	res.render("home", {
		title: "Homepage"
	});
};
