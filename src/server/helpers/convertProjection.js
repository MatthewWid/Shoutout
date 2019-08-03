/*
	Convert Mongoose projection string to MongoDB projection object

	Eg,
	"_id nick name avatarUrl -bannerUrl created"

	=>

	{
		'author._id': 1,
		'author.nick': 1,
		'author.name': 1,
		'author.avatarUrl': 1,
		'author.bannerUrl': 0,
		'author.created': 1
	}
*/
exports.mongoose = (projection, nest = "") => {
	const obj = {};
	projection.split(" ").forEach(e => {
		const isRemove = e.charAt(0) === "-";
		return obj[`${nest && `${nest}.`}${isRemove ? e.substring(1, e.length) : e}`] = isRemove ? 0 : 1;
	});
	return obj;
};
