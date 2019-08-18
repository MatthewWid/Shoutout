// Create API routes
const api = () => {
	const router = require("express").Router();
	const {home, auth, user, post} = require("../controllers/");

	router.use(auth.routes);
	router.use(user.routes);
	router.use(post.routes);
	router.use(home.routes);

	return router;
};

// Create page and SSR routes
const pages = () => {
	const router = require("express").Router();
	const {home} = require("../controllers/");

	router.use("/", home.controllers.indexPage);

	return router;
};

module.exports = () => {
	const router = require("express").Router();

	router.use("/api", api());
	router.use("/", pages());

	return router;
};
