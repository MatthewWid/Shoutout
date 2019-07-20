exports.PROJECTION_USER = "_id nick name email avatarUrl bannerUrl isAdmin created";

exports.PROJECTION_POST = "_id text created author shortId";

exports.PROJECTION_LIKE = "_id created postId userId";

// Forbidden names that could conflict with existing page routes
exports.FORBIDDEN_NAMES = [
	"api",

	"home",
	"about",
	"trending",
	"top",
	"new",
	"explore",
	"discover",
	"search",

	"signup",
	"login",
	"settings",
	"preferences",
	"help",
	"messages",
	"notifications",

	"contact",
	"attribution",
	"licence",
	"license",
	"tos",
	"termsofservice",
	"useragreement",
	"privacy",
	"legal"
];

exports.POSTS_PER_PAGE = 10;
