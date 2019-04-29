const router = require("express").Router();

router.get("/", (req, res) => {
	res.render("home", {
		title: "Homepage"
	});
});

module.exports = router;
