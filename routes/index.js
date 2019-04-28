const router = require("express").Router();

router.get("/", (req, res) => {
	res.send("Index page");
});

module.exports = router;
