exports.ping = (req, res) => res.send("pong");

exports.indexPage = (req, res) => {
	res.render("index");
};
