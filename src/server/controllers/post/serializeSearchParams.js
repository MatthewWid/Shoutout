// Serialize query parameters and attach to `searchParams` property on the request object
const controller = (req, res, next) => {
	const searchParams = {};

	// Filter by author ID
	if (req.query["authorid"]) {
		// Attach 'author' object to filter if searching by author
		searchParams.author = searchParams.author || {};

		searchParams.author._id = req.query["authorid"];
	}

	// Filter by author username
	if (req.query["authorname"]) {
		searchParams.author = searchParams.author || {};

		searchParams.author.name = req.query["authorname"];
	}

	// Sort results (Top, trending, new, old, etc.)
	if (req.query["sort"]) {
		searchParams.sort = req.query["sort"];
	} else {
		searchParams.sort = "new";
	}

	// Page number
	if (req.query["page"]) {
		searchParams.page = req.query["page"];
	} else {
		searchParams.page = 0;
	}

	req.searchParams = searchParams;

	next();
};

module.exports = controller;
