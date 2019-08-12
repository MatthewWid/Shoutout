/*
	Convert Mongoose projection string to MongoDB projection object.
	Takes an optional `nest` parameter that prefixes object property keys
	with the given string.

	Eg,
	"_id nick name avatar -avatar created"

	=>

	{
		'_id': 1,
		'nick': 1,
		'name': 1,
		'avatar': 1,
		'banner': 0,
		'created': 1
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
